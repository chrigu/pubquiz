defmodule PubquizGame.Game do

  alias PubquizGame.Game
  alias PubquizGame.Chapter
  alias PubquizGame.Question
  alias PubquizGame.Answer
  alias PubquizGame.History
  alias PubquizGame.Utils

  @filename "../../data/pubquiz.json"

  # @enforce_keys [:scores]
  defstruct chapters: nil, history: [], current_chapter: 0, current_question: 0, over: false

  @doc """
  Creates a new Game.
  """
  def init(filename) do
    Game.read_from_json(filename)
      |> elem(1)
      |> (&(Map.put(&1, :history, History.init(&1)))).()
  end

  @doc """
  Read game content from json
  """
  def read_from_json(filename) do
    path = Path.expand(filename, __DIR__)
    with {:ok, body} <- File.read(path),
         {:ok, json} <- Poison.decode(body, keys: :atoms, as: %Game{chapters: [%Chapter{questions: [%Question{answers: [%Answer{}]}]}]}), do: {:ok, json}
  end

  def next_step(game) do
    game
      |> update_question_index
      |> update_chapter_index
  end

  defp update_question_index(game) do
    current_chapter = Enum.at(game.chapters, game.current_chapter)
    case Utils.is_last(current_chapter.questions, game.current_question) do
      true -> {:last_section_done, %Game{game | current_question: 0}}
      false -> {:other_section_done, %Game{game | current_question: game.current_question + 1}}
    end
  end
    
  defp update_chapter_index({:other_section_done, game}) do
    {:same_chapter, game}
  end

  defp update_chapter_index({:last_section_done, game}) do
    case Utils.is_last(game.chapters, game.current_chapter) do
      true -> {:game_over, %Game{game | over: true}}
      false -> {:new_chapter, %Game{game | current_chapter: game.current_chapter + 1}}
    end
  end

  def answer_question(game, player, answer) do
    is_answer_correct(game, answer)
      |> update_history(player, game)
  end

  defp is_answer_correct(game, answer) do
    correct_index = get_current_question(game).answers
      |> find_answer_index(fn(answer) -> answer.correct end)
      |> List.first
    correct_index == answer
  end

  # https://stackoverflow.com/questions/18551814/find-indexes-from-list-in-elixir
  defp find_answer_index(collection, function) do
    Enum.filter_map(Enum.with_index(collection), fn({x, _y}) -> function.(x) end, &(elem(&1, 1)))
  end

  defp get_current_chapter(game) do
    Enum.at(game.chapters, game.current_chapter)
  end

  defp get_current_question(game) do
    get_current_chapter(game)
      |> (&(Enum.at(&1.questions, game.current_question))).()
  end

  defp update_history(correct, player, game) do
    chapter_history = Enum.at(game.history, game.current_chapter)
    
    question_score = Enum.at(chapter_history, game.current_question)
    updated_question_score = Map.put(question_score, player, correct)

    chapter_history
      |> List.replace_at(game.current_question, updated_question_score)
      |> (&(List.replace_at(game.history, game.current_chapter, &1))).()
      |> (&(%Game{game| history: &1})).()
  end

  def get_leaderboard(game) do
    Enum.reduce(game.history, %{}, &(get_leaderboard_for_chapter(&1, &2)))
  end

  def get_leaderboard_for_chapter(chapter_history, score) do
    Enum.reduce(chapter_history, score, &(get_leaderboard_for_question(&1, &2)))
  end

  defp get_leaderboard_for_question(question_player_scores, score) do
    player_keys = Map.keys(question_player_scores)
    Enum.reduce(player_keys, score, &(update_score(&1, &2, question_player_scores)))
  end

  defp update_score(key, score, question_player_scores) do
    case Map.has_key?(question_player_scores, key) and Map.get(question_player_scores, key) do
      true -> Map.put(score, key, Map.get(score, key, 0) + 1)
      false -> Map.put(score, key, Map.get(score, key, 0))
    end
  end

  @doc """
  create summary from game
  """
  def summary(game) do
    chapter = get_current_chapter(game).title
    question = get_current_question(game).question
    answers = get_current_question(game).answers
    |> Enum.map(&(&1.text))
    leaderboard = get_leaderboard(game)

    %{chapter: chapter, question: question, answers: answers, leaderboard: leaderboard}
  end


end
