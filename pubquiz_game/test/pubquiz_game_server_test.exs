defmodule GameServerTest do
  use ExUnit.Case, async: true

  doctest PubquizGame.GameServer

  alias PubquizGame.{GameServer}

  @game_name "foo"

  test "spawning a game server process" do
    assert {:ok, _pid} = GameServer.start_link(@game_name)
  end

  test "a game process is registered under a unique name" do
    assert {:ok, _pid} = GameServer.start_link(@game_name)

    assert {:error, _reason} = GameServer.start_link(@game_name)
  end

#  test "stores initial state in ETS when started" do
#    game_name = generate_game_name()
#
#    {:ok, _pid} =
#      GameServer.start_link(game_name, 3)
#
#    assert [{^game_name, game}] = :ets.lookup(:games_table, game_name)
#
#    assert Enum.count(game.squares) == 3
#    assert game.scores == %{}
#    assert game.winner == nil
#  end

#  test "gets its initial state from ETS if previously stored" do
#
#    game_name = generate_game_name()
#
#    player = Player.new("Nicole", "green")
#
#    game = Game.new(3)
#    square = square_at_position(game.squares, 0, 0)
#    game = Game.mark(game, square.phrase, player)
#
#    :ets.insert(:games_table, {game_name, game})
#
#    {:ok, _pid} =
#      GameServer.start_link(game_name, 3)
#
#    summary = GameServer.summary(game_name)
#
#    square = square_at_position(summary.squares, 0, 0)
#
#    assert square.marked_by == player
#  end

  describe "game_pid" do
    test "returns a PID if it has been registered" do
      {:ok, pid} = GameServer.start_link(@game_name)
      assert ^pid = GameServer.game_pid(@game_name)
    end

    test "returns nil if the game does not exist" do
      refute GameServer.game_pid("nonexistent-game")
    end
  end

end
