defmodule PubquizWeb.ApiView do
  use PubquizWeb, :view
#  alias RealWorldWeb.{ArticleView, FormatHelpers, UserView}

  def render("index.json", %{user: user}) do
    %{
      name: user.name,
    }
  end

end