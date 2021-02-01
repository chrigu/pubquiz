defmodule PubquizGameTest do
  use ExUnit.Case

  alias PubQuizGame.Utils
  alias PubQuizGame.Game
  alias PubQuizGame.Player

  @filename "../../data/pubquiz_test.json"
  # doctest PubquizGame

  # test "greets the world" do
  #   assert PubquizGame.hello() == :world
  # end

  def get_game() do
    Game.init(@filename)
  end

  test "goes to next section" do
    next_game = get_game()
      |> Game.next_step

    assert next_game.current_question == 1
  end

  test "goes to next chapter" do
    game = get_game()
    next_game = game
      |> Map.replace!(:current_question, 2)
      |> Game.next_step

    assert next_game.current_question == 0
    assert next_game.current_chapter == game.current_chapter + 1
  end

  test "ends game if no last question" do
    game = get_game()
    next_game = game
      |> Map.replace!(:current_question, 1)
      |> Map.replace!(:current_chapter, 1)
      |> Game.next_step

    assert next_game.over == true
  end

  test "player answers question correct" do
    next_game = get_game()
      |> Map.replace!(:current_chapter, 1)
      |> Map.replace!(:current_question, 0)
      |> Game.answer_question(%Player{name: "Hans", color: :blue}, 1)

    score = next_game.history
    |> Enum.at(next_game.current_chapter)
    |> Enum.at(next_game.current_question)

    assert %{"Hans" => true} == score
  end
end
