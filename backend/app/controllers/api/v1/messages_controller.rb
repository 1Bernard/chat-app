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
        # Schedule bot response
        BotResponseJob.set(wait: 2.seconds).perform_later(@conversation.id)

        render json: MessageSerializer.new(@message).serializable_hash, status: :created
      else
        render json: { errors: @message.errors }, status: :unprocessable_entity
      end
    end

    private

    def set_conversation
      @conversation = Conversation.find(params[:conversation_id])
    end

    def message_params
      params.require(:message).permit(:content)
    end
  end
end
