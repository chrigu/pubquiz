defmodule PubquizGame.Utils do

  def is_last(list, index) do
    l = length(list) - 1
    index >= l
  end

  def logger(data) do
    IO.inspect(data)
    data
  end

end