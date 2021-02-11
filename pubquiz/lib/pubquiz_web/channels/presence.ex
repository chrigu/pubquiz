defmodule PubquizWeb.Presence do
  use Phoenix.Presence,
    otp_app: :pubquiz_web,
    pubsub_server: Pubquiz.PubSub
end
