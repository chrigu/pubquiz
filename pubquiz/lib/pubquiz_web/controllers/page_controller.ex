defmodule PubquizWeb.PageController do
  use PubquizWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
