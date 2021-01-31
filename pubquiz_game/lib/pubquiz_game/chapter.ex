defmodule PubQuizGame.Chapter do
  
  # @enforce_keys [:title, :questions, :timelimit]
  defstruct [:title, :questions, :timelimit]

  @doc """
  Creates a Chapter with the given `question` and `questions`.
  """

  def new(title, questions, timelimit) do
    %PubQuizGame.Chapter{title: title, questions: questions, timelimit: timelimit}
  end

end
