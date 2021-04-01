defmodule PubquizWeb.GameChannelTest do
  use PubquizWeb.ChannelCase
  alias PubquizGame.{GameServer, GameSupervisor}

  alias PubquizWeb.GameChannel


  setup do
    game_name = "test-game-123"
    topic = "games:#{game_name}"
    player = %{:name => "Hans"}

    GameSupervisor.start_game(game_name)

    token = Phoenix.Token.sign(socket(), "player_auth", player)

    {:ok, socket} = connect(PubquizWeb.UserSocket, %{"token" => token})

    [
      game_name: game_name,
      topic: topic,
      socket: socket,
      player: player
    ]
  end

  describe "join" do
    test "pushes the current game and presence state", context do
      {:ok, _reply, _socket} =
        subscribe_and_join(context.socket, GameChannel, context.topic, %{})

      assert context.socket.assigns.current_player == context.player.name

      assert_push("presence_state", %{})

      summary = GameServer.summary(context.game_name)

      assert_push("game_summary", ^summary)
    end

    test "returns error if game does not exist", context do
      assert {:error, %{reason: "Game does not exist"}} =
        subscribe_and_join(context.socket, GameChannel, "games:9999", %{})
    end
  end

  describe "start game" do
    test "receive inital state", context do
      {:ok, _reply, _socket} =
        subscribe_and_join(context.socket, GameChannel, context.topic, %{})

      assert context.socket.assigns.current_player == context.player.name

      assert_push("presence_state", %{})

      summary = GameServer.summary(context.game_name)

      assert_push("game_summary", ^summary)
    end

    test "returns error if game does not exist", context do
      assert {:error, %{reason: "Game does not exist"}} =
        subscribe_and_join(context.socket, GameChannel, "games:9999", %{})
    end
  end

  describe "show question" do
    test "send question command", context do
      {:ok, _reply, _socket} =
        subscribe_and_join(context.socket, GameChannel, context.topic, %{})

      ref = push socket, "question", %{}
    end

    test "returns error if game does not exist", context do
      assert {:error, %{reason: "Game does not exist"}} =
        subscribe_and_join(context.socket, GameChannel, "games:9999", %{})
    end
  end

#  test "ping replies with status ok", %{socket: socket} do
#    ref = push socket, "ping", %{"hello" => "there"}
#    assert_reply ref, :ok, %{"hello" => "there"}
#  end
#
#  test "shout broadcasts to room:lobby", %{socket: socket} do
#    push socket, "shout", %{"hello" => "all"}
#    assert_broadcast "shout", %{"hello" => "all"}
#  end
#
#  test "broadcasts are pushed to the client", %{socket: socket} do
#    broadcast_from! socket, "broadcast", %{"some" => "data"}
#    assert_push "broadcast", %{"some" => "data"}
#  end
end
