defmodule PubquizGameTest do
  use ExUnit.Case

  alias PubQuizGame.Utils
  alias PubQuizGame.Game

  @filename "../../data/pubquiz_test.json"
  # doctest PubquizGame

  # test "greets the world" do
  #   assert PubquizGame.hello() == :world
  # end

  def get_game() do
    Game.read_from_json(@filename)
    |> elem(1)
  end

  test "goes to next section" do
    next_game = get_game()
      |> Game.next_step

    assert next_game.current_question == 1
  end

  test "goes to next chapter" do
    next_game = get_game()
      |> Map.replace!(:current_question, 3)
      |> Game.next_step

    assert next_game.current_question == 0
  end
end
