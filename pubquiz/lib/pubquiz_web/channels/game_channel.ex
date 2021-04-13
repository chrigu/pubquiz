defmodule PubquizWeb.GameChannel do
  use PubquizWeb, :channel

  alias PubquizWeb.Presence
  alias PubquizGame.GameServer

  def join("games:" <> game_name, _params, socket) do
    case GameServer.game_pid(game_name) do
      pid when is_pid(pid) ->
        send(self(), {:after_join, game_name})
        {:ok, socket}

      nil ->
        {:error, %{reason: "Game does not exist"}}
    end
  end

  def handle_info({:after_join, game_name}, socket) do
    summary = GameServer.summary(game_name)

    push(socket, "game_summary", summary)
    push(socket, "presence_state", Presence.list(socket))

    {:ok, _} =
      Presence.track(socket, current_player(socket), %{
        online_at: inspect(System.system_time(:second)),
      })

    {:noreply, socket}
  end

  def handle_in("start_game", _obj, socket) do
    "games:" <> game_name = socket.topic

    # check if admin

    case GameServer.game_pid(game_name) do
      pid when is_pid(pid) ->
        summary = GameServer.summary(game_name)
        broadcast!(socket, "summary", summary)

        {:noreply, socket}

      nil ->
        {:reply, {:error, %{reason: "Game does not exist"}}, socket}
    end
  end

  def handle_in("next_question", _obj, socket) do
    "games:" <> game_name = socket.topic

    # check if admin

    case GameServer.game_pid(game_name) do
      pid when is_pid(pid) ->
        summary = GameServer.next_question(game_name)

        some(summary, socket, game_name)

        {:noreply, socket}

      nil ->
        {:reply, {:error, %{reason: "Game does not exist"}}, socket}
    end
  end


  def handle_in("question", _obj, socket) do
    "games:" <> game_name = socket.topic

    # check if admin

    case GameServer.game_pid(game_name) do
      pid when is_pid(pid) ->
        summary = GameServer.question(game_name)
        some({:same_chapter, summary}, socket, game_name)

        {:noreply, socket}

      nil ->
        {:reply, {:error, %{reason: "Game does not exist"}}, socket}
    end
  end

  def handle_in("answer_question", %{"answer_index" => answer_index}, socket) do
    "games:" <> game_name = socket.topic
    # check if admin

    case GameServer.game_pid(game_name) do
      pid when is_pid(pid) ->
        summary = GameServer.answer_question(game_name, answer_index, current_player(socket))
#       IO.inspect(summary)
#        some(summary, socket, game_name)

        {:noreply, socket}

      nil ->
        {:reply, {:error, %{reason: "Game does not exist"}}, socket}
    end
  end

  defp current_player(socket) do
    socket.assigns.current_player
  end

  defp timer_ended(game_name, socket) do
    PubquizWeb.Timer.startTimer(5, 1000, fn(count) -> broadcast!(socket, "timer", %{count: count}) end)
    GameServer.allow_answers(game_name, false)
    summary_with_solutions = GameServer.show_solution(game_name)
    broadcast!(socket, "summary", summary_with_solutions)

    {:noreply, socket}
  end

  defp some({:same_chapter, summary}, socket, game_name) do
      broadcast!(socket, "question", summary)

      GameServer.allow_answers(game_name, true)
      Task.start(fn() -> timer_ended(game_name, socket) end)
  end

  defp some({:new_chapter, summary}, socket, _game_name) do
    broadcast!(socket, "chapter", summary)
  end

  defp some({:game_over, summary}, socket, _game_name) do
    broadcast!(socket, "gameover", summary)
  end

end
