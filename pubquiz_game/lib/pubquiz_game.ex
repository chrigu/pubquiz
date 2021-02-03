defmodule PubQuizGame do
  use Application

  def start(_type, _args) do
    children = [
      {Registry, keys: :unique, name: PubQuizGame.GameRegistry},
      PubQuizGame.GameSupervisor
    ]

#    :ets.new(:games_table, [:public, :named_table])

    opts = [strategy: :one_for_one, name: PubQuizGame.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
