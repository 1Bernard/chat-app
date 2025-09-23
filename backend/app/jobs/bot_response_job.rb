class BotResponseJob < ApplicationJob
  queue_as :default

  def perform(conversation_id)
    conversation = Conversation.find(conversation_id)
    conversation.messages.create!(
      content: "This is an AI generated response",
      role: :bot
    )
  end
end
