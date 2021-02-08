defmodule PubquizWeb.ApiController do
  use PubquizWeb, :controller

  alias PubquizGame.{GameServer, GameSupervisor}

  def start(conn, %{"name" => name}) do
    game_name = Pubquiz.HaikuName.generate()

    game_init_info = %{name: name, game_name: game_name}

    case GameSupervisor.start_game(game_name) do
      {:ok, _game_pid} ->
        conn
        |> put_session(:player, %{name: name})
        |> render("index.json", game_init_info)

      {:error, _error} ->
        conn
        |> put_flash(:error, "Unable to start game!")
        |> redirect(to: "/game/fail")
    end

  end
end

#    game_name = BingoHall.HaikuName.generate()
#    size = String.to_integer(size)
#
#    case GameSupervisor.start_game(game_name, size) do
#      {:ok, _game_pid} ->
#        redirect(conn, to: game_path(conn, :show, game_name))
#
#      {:error, _error} ->
#        conn
#        |> put_flash(:error, "Unable to start game!")
#        |> redirect(to: game_path(conn, :new))
#    end