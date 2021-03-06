# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :pubquiz,
  ecto_repos: []
#  ecto_repos: [Pubquiz.Repo]

# Configures the endpoint
config :pubquiz, PubquizWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "iozBZAEM0ezuTaPVWBcXbukLhM0z0iEjKYaVR/JzWz6/bLx9qDSR3zqCFK0loDrs",
  render_errors: [view: PubquizWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Pubquiz.PubSub,
  live_view: [signing_salt: "NPMMRZok"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
