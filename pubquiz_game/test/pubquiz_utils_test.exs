defmodule PubquizGameUtilsTest do
    use ExUnit.Case

    alias PubQuizGame.Utils
  
    test "is last element of list" do
      assert Utils.is_last([1, 2, 3], 2) == true
    end

    test "is not last element of list" do
      assert Utils.is_last([1, 2, 3], 1) == false
    end
  end
  