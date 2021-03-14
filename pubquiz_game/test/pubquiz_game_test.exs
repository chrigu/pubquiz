defmodule PubquizGameTest do
  use ExUnit.Case

  alias PubquizGame.Game

  @filename "../../data/pubquiz_test.json"
  # doctest PubquizGame

  # test "greets the world" do
  #   assert PubquizGame.hello() == :world
  # end

  def get_game() do
    Game.init(@filename)
  end

  test "goes to next question" do
    next = get_game()
      |> Game.next_step

    next_game = elem(next, 1)

    assert :same_chapter == elem(next, 0)
    assert next_game.current_question == 1
  end

  test "goes to next chapter" do
    game = get_game()
    next = game
      |> Map.replace!(:current_question, 2)
      |> Game.next_step

    next_game = elem(next, 1)

    assert :new_chapter == elem(next, 0)
    assert next_game.current_question == 0
    assert next_game.current_chapter == game.current_chapter + 1
  end

  test "ends game if no last question" do
    game = get_game()
    next = game
      |> Map.replace!(:current_question, 1)
      |> Map.replace!(:current_chapter, 1)
      |> Game.next_step

    next_game = elem(next, 1)

    assert :game_over == elem(next, 0)
    assert next_game.over == true
  end

  test "player answers question correct" do
    next_game = get_game()
      |> Map.replace!(:current_chapter, 1)
      |> Map.replace!(:current_question, 0)
      |> Game.answer_question("Hans", 1)

    score = next_game.history
    |> Enum.at(next_game.current_chapter)
    |> Enum.at(next_game.current_question)

    assert %{"Hans" => true} == score
  end

  test "player answers question wrong" do
    next_game = get_game()
      |> Map.replace!(:current_chapter, 0)
      |> Map.replace!(:current_question, 0)
      |> Game.answer_question("Hans", 1)

    score = next_game.history
    |> Enum.at(next_game.current_chapter)
    |> Enum.at(next_game.current_question)

    assert %{"Hans" => false} == score
  end

  test "calculates score for chapter with empty score" do
    chapter = [%{"Hans" => true, "Fritz" => false, "Betli" => true}, %{"Hans" => false, "Fritz" => false, "Betli" => true}]
    score = Game.get_leaderboard_for_chapter(chapter, %{})
    assert %{"Betli" => 2, "Fritz" => 0, "Hans" => 1} == score
  end

  test "calculates score for chapter with given score" do
    chapter_score = [%{"Hans" => true, "Fritz" => false, "Betli" => true}, %{"Hans" => true, "Fritz" => false, "Betli" => true}]
    score = Game.get_leaderboard_for_chapter(chapter_score, %{"Fritz" => 1})
    assert %{"Betli" => 2, "Fritz" => 1, "Hans" => 2} == score
  end

  test "calculates score for game" do
    history = [
      [
        %{"Hans" => true, "Fritz" => false, "Betli" => true},
        %{"Hans" => false, "Fritz" => false, "Betli" => true},
        %{"Hans" => false, "Fritz" => true, "Betli" => false}
      ],
      [
        %{"Hans" => true, "Fritz" => false, "Betli" => true},
        %{"Hans" => false, "Fritz" => false, "Betli" => false}
      ]
    ]

    next_game = get_game()
      |> Map.replace!(:history, history)

    score = Game.get_leaderboard(next_game)
    assert %{"Betli" => 3, "Fritz" => 1, "Hans" => 2} == score
  end

  test "creates summary" do
    summary = get_game()
      |> Map.replace!(:current_chapter, 1)
      |> Map.replace!(:current_question, 0)
      |> Game.answer_question("Hans", 1)
      |> Game.summary

    assert %{answers: ["a11", "a12", "a13", "a14"], chapter: %{index: 1, title: "ch2"}, leaderboard: %{"Hans" => 1}, question: "q1"} == summary
  end
end
