require 'rails_helper'

RSpec.describe BotResponseJob, type: :job do
  include ActiveJob::TestHelper

  describe '#perform' do
    let!(:conversation) { create(:conversation) }

    it 'creates a bot response message when last message is from user' do
      # Create a user message to trigger bot response (without assigning to variable)
      create(:message, conversation: conversation, role: :user)
      
      expect {
        BotResponseJob.perform_now(conversation.id)
      }.to change(Message, :count).by(1)

      message = Message.last
      expect(message.content).to eq('This is an AI generated response to your message')
      expect(message.role).to eq('bot')
      expect(message.conversation).to eq(conversation)
    end

    it 'does not create a bot response when last message is from bot' do
      # The conversation already has an initial bot message
      expect {
        BotResponseJob.perform_now(conversation.id)
      }.not_to change(Message, :count)
    end

    it 'handles non-existent conversation gracefully' do
      expect {
        BotResponseJob.perform_now(-1)
      }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end