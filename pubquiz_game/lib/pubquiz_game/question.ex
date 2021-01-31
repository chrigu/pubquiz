defmodule PubQuizGame.Question do
  
  # @enforce_keys [:question, :answers]
  defstruct [:question, :answers]

  @doc """
  Creates a question with the given `qustion` ,`answers``.
  """
  def new(question, answers) do
    %PubQuizGame.Question{question: question, answers: answers}
  end
end
