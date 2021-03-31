defmodule PubquizWeb.Timer do
  @moduledoc false

  def startTimer(count, timeToSleep, callbackFn) do
    timer(count, timeToSleep, callbackFn)
  end

  def timer(0, _timeToSleep, callbackFn), do: IO.puts "ended the recursion."

  def timer(count, timeToSleep, callbackFn) when is_integer count do
    callbackFn.(count)
    Process.sleep(timeToSleep)
    timer(count - 1, timeToSleep, callbackFn)
  end

end
