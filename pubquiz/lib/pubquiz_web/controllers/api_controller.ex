defmodule PubquizWeb.ApiController do
  use PubquizWeb, :controller

  alias PubquizGame.{GameServer, GameSupervisor}

  def start(conn, %{"player" => name}) do
    game_name = Pubquiz.HaikuName.generate()
    game_init_info = %{name: name, game_name: game_name, is_admin: true}
    token = Phoenix.Token.sign(conn, "player_auth", game_init_info)

    case GameSupervisor.start_game(game_name) do
      {:ok, _game_pid} ->
        conn
        |> put_session(:current_player, %{name: name})
        |> render("index.json", %{game_info: game_init_info, token: token})

      {:error, _error} ->
        conn
        |> put_flash(:error, "Unable to start game!")
        |> redirect(to: "/game/fail")
    end
  end

  def join(conn, %{"player" => name, "gameName" => game_name}) do

    case GameServer.game_pid(game_name) do
      pid when is_pid(pid) ->
        game_info = %{name: name, game_name: game_name, is_admin: false}
        token = Phoenix.Token.sign(conn, "player_auth", game_info)
        conn
        |> put_session(:current_player, %{name: name})
        |> render("index.json", %{game_info: game_info, token: token})
      nil ->
        {:error, %{reason: "Game does not exist"}}
#    endredirect(to: "/game/fail")
    end
  end

  defp generate_auth_token(conn) do
    current_player = get_session(conn, :current_player)
    Phoenix.Token.sign(conn, "player_auth", current_player.name)
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