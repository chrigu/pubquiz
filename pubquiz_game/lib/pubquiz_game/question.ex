defmodule PubquizGame.Question do
  
  # @enforce_keys [:question, :answers]
  defstruct [:question, :answers]

  @doc """
  Creates a question with the given `qustion` ,`answers``.
  """
  def new(question, answers) do
    %PubquizGame.Question{question: question, answers: answers}
  end
end
