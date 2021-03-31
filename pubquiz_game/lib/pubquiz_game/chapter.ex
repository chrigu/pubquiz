defmodule PubquizGame.Chapter do
  
  # @enforce_keys [:title, :questions, :timelimit]
  @derive Jason.Encoder
  defstruct [:title, :questions, :timelimit]

  @doc """
  Creates a Chapter with the given `question` and `questions`.
  """

  def new(title, questions, timelimit) do
    %PubquizGame.Chapter{title: title, questions: questions, timelimit: timelimit}
  end

end
