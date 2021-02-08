defmodule PubquizWeb.ApiView do
  use PubquizWeb, :view
#  alias RealWorldWeb.{ArticleView, FormatHelpers, UserView}

  def render("index.json", %{name: name, game_name: game_name}) do
    %{name: name, game_name: game_name}
  end

end