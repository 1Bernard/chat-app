class BotResponseJob < ApplicationJob
  queue_as :default

  def perform(conversation_id)
    conversation = Conversation.find(conversation_id)

    # Don't create a response if the last message is already from the bot
    last_message = conversation.messages.last
    return if last_message&.bot?

    # Simulate AI response - replace with actual AI service integration
    bot_response = generate_bot_response(conversation)

    conversation.messages.create!(
      content: bot_response,
      role: :bot
    )
  end

  private

  def generate_bot_response(conversation)
    # Simple response for now - you can integrate with AI services here
    "This is an AI generated response to your message"
  end
end
