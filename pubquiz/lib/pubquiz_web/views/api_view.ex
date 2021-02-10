defmodule PubquizWeb.ApiView do
  use PubquizWeb, :view
#  alias RealWorldWeb.{ArticleView, FormatHelpers, UserView}

  def render("index.json", %{game_info: game_info, token: token}) do
    %{game_info: game_info, token: token}
  end

end