defmodule PubquizGame.GameServer do
  @moduledoc """
  A game server process that holds a `Game` struct as its state.
  """

  use GenServer

  require Logger

  @timeout :timer.hours(2)
  @filename "../../data/pubquiz.json"

  # Client (Public) Interface

  @doc """
  Spawns a new game server process registered under the given `game_name`.
  """
  def start_link(game_name) do
    GenServer.start_link(__MODULE__,
                         {game_name},
                         name: via_tuple(game_name))
  end

  def game_score(game_name) do
    GenServer.call(via_tuple(game_name), :game_score)
  end

  def summary(game_name) do
    GenServer.call(via_tuple(game_name), :game_summary)
  end

  def question(game_name) do
    GenServer.call(via_tuple(game_name), :question)
  end

  def answer_question(game_name, answer, player) do
    GenServer.call(via_tuple(game_name), {:answer_question, answer, player})
  end

 def next_step(game_name) do
    GenServer.call(via_tuple(game_name), :next_step)
  end

 def chapter_title(game_name) do
    GenServer.call(via_tuple(game_name), :chapter_title)
  end

  @doc """
  Returns a tuple used to register and lookup a game server process by name.
  """
  def via_tuple(game_name) do
    {:via, Registry, {PubquizGame.GameRegistry, game_name}}
  end

  @doc """
  Returns the `pid` of the game server process registered under the
  given `game_name`, or `nil` if no process is registered.
  """
  def game_pid(game_name) do
    game_name
    |> via_tuple()
    |> GenServer.whereis()
  end

  # Server Callbacks

  def init({game_name}) do

    game = PubquizGame.Game.init(@filename)

#    game =
#      case :ets.lookup(:games_table, game_name) do
#        [] ->
#          game = Bingo.Game.new(buzzwords, size)
#          :ets.insert(:games_table, {game_name, game})
#          game
#
#        [{^game_name, game}] ->
#          game
#    end

    Logger.info("Spawned game server process named '#{game_name}'.")

    {:ok, game, @timeout}
  end

  def handle_call(:game_score, _from, game) do
    {:reply, PubquizGame.Game.get_leaderboard(game), game, @timeout}
  end

  def handle_call({:answer_question, answer, player}, _from, game) do
    new_game = PubquizGame.Game.answer_question(game, player, answer)

#    :ets.insert(:games_table, {my_game_name(), new_game})

    {:reply, new_game, new_game, @timeout}
  end

  def handle_call(:next_step, _from, game) do

    # check state & answers, check user = admin
    reply = PubquizGame.Game.next_step(game)
    {:reply, elem(reply, 0), elem(reply, 1), @timeout}
  end

  def handle_call(:game_summary, _from, game) do
    # check state & answers, check user = admin
    summary = PubquizGame.Game.summary(game)
    chapter_title = %{chapter: summary.chapter, leaderboard: summary.leaderboard}
    {:reply, chapter_title, game, @timeout}
  end

  def handle_call(:question, _from, game) do
    # check state & answers, check user = admin
    summary = PubquizGame.Game.summary(game)
    {:reply, summary, game, @timeout}
  end

  def handle_call(:solution, _from, game) do
    summary = PubquizGame.Game.summary_with_solution(game)
    {:reply, summary, game, @timeout}
  end

  def handle_info(:timeout, game) do
    {:stop, {:shutdown, :timeout}, game}
  end

  def terminate({:shutdown, :timeout}, _game) do
#    :ets.delete(:games_table, my_game_name())
    :ok
  end

  def terminate(_reason, _game) do
    :ok
  end

  defp my_game_name do
    Registry.keys(PubquizGame.GameRegistry, self()) |> List.first
  end
end
