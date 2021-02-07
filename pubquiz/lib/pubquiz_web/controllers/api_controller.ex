defmodule PubquizWeb.ApiController do
  use PubquizWeb, :controller

  alias PubquizGame.{GameServer, GameSupervisor}

  def start(conn, params) do
    game_name = Pubquiz.HaikuName.generate()

    player = %{name: "Hans"}

    case GameSupervisor.start_game(game_name) do
      {:ok, _game_pid} ->
        conn
#        |> put_session(:player, player)
        |> redirect(to: "/" <> game_name)

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