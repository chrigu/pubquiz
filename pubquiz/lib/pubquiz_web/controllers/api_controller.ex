defmodule PubquizWeb.ApiController do
  use PubquizWeb, :controller

  def start(conn, params) do
      user = %{name: "Hans"}
      IO.inspect(conn)
      IO.inspect(params)
      conn
      |> put_status(:created)
      |> render("index.json", user: user)
  end
end