module Api::V1
  class ConversationsController < ApplicationController
    before_action :set_conversation, only: [:show, :destroy]
    
    # GET /api/v1/conversations
    def index
      @conversations = Conversation.all
      render json: ConversationSerializer.new(@conversations).serializable_hash
    end
    
    # GET /api/v1/conversations/1
    def show
      render json: ConversationSerializer.new(@conversation).serializable_hash
    end
    
    # POST /api/v1/conversations
    def create
      # Allow empty title, model will set default
      conversation_params = params.require(:conversation).permit(:title)
      conversation_params[:title] = nil if conversation_params[:title].blank?
      
      @conversation = Conversation.new(conversation_params)
      
      if @conversation.save
        render json: ConversationSerializer.new(@conversation).serializable_hash, status: :created
      else
        render json: { errors: @conversation.errors }, status: :unprocessable_entity
      end
    end
    
    # DELETE /api/v1/conversations/1
    def destroy
      @conversation.destroy
      head :no_content
    end
    
    private
    
    def set_conversation
      @conversation = Conversation.find(params[:id])
    end
  end
end