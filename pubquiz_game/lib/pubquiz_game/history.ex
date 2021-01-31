defmodule PubQuizGame.History do
  
    # @enforce_keys [:title, :questions, :timelimit]
  
    @doc """
    Creates a Chapter with the given `question` and `questions`.
    """
  
    def init(game) do
      history = for chapter <- game.chapters, do: create_question_history(chapter.questions, [])
      IO.inspect(history)
      history
    end

    defp create_question_history([head|tail], questions_history) do
      questions_history = [%{}|questions_history]
      create_question_history(tail, questions_history)
    end

    defp create_question_history([], questions_history) do
      questions_history
    end
  
  end
  