defmodule PubQuizGame.Answer do
  
    # @enforce_keys [:text, :correct]
    defstruct [:text, :correct]
  
    @doc """
    Creates a player with the given `text` and `correct`.
    """
    def new(text, correct) do
      %PubQuizGame.Answer{text: text, correct: correct}
    end
  end
  