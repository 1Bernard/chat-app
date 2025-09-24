module Api::V1
  class MessagesController < ApplicationController
    before_action :set_conversation

    # GET /api/v1/conversations/:conversation_id/messages
    def index
      @messages = @conversation.messages.order(created_at: :asc)
      render json: MessageSerializer.new(@messages).serializable_hash
    end

    # POST /api/v1/conversations/:conversation_id/messages
    def create
      @message = @conversation.messages.new(message_params)
      @message.role = :user

      if @message.save
        create_ai_response(@conversation)

        # Return all messages (including the new ones) for the conversation
        @messages = @conversation.messages.order(created_at: :asc)
        render json: MessageSerializer.new(@messages).serializable_hash, status: :created
      else
        render json: { errors: @message.errors.full_messages }, status: :unprocessable_content
      end
    end

    private

    def set_conversation
      @conversation = Conversation.find(params[:conversation_id])
    end

    def message_params
      params.require(:message).permit(:content)
    end

    def create_ai_response(conversation)
      # Don't create a response if the last message is already from the bot
      last_message = conversation.messages.last
      return if last_message&.bot?

      # Create AI response immediately
      bot_response = generate_bot_response(conversation)

      conversation.messages.create!(
        content: bot_response,
        role: :bot
      )
    end

    def generate_bot_response(conversation)
      # Simple response as per requirements
      "This is an AI generated response"
    end
  end
end
