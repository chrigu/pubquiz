defmodule PubquizWeb.Timer do
  @moduledoc false

  def startTimer(count, timeToSleep, updatedCallback) do
    timer(count, timeToSleep, updatedCallback)
  end

  def timer(0, _timeToSleep, updatedCallback) do
    IO.puts "ended the recursion."
  end

  def timer(count, timeToSleep, updatedCallback) when is_integer count do
    updatedCallback.(count)
    Process.sleep(timeToSleep)
    timer(count - 1, timeToSleep, updatedCallback)
  end

end
