require 'swagger_helper'

RSpec.describe 'Messages API', type: :request do
  path '/api/v1/conversations/{conversation_id}/messages' do
    get 'Retrieves all messages for a conversation' do
      tags 'Messages'
      produces 'application/json'
      parameter name: :conversation_id, in: :path, type: :integer

      response '200', 'messages found' do
        schema type: :array,
          items: {
            type: :object,
            properties: {
              id: { type: :integer },
              content: { type: :string },
              role: { type: :string },
              conversation_id: { type: :integer },
              created_at: { type: :string, format: 'date-time' },
              updated_at: { type: :string, format: 'date-time' }
            },
            required: [ 'id', 'content', 'role', 'conversation_id', 'created_at', 'updated_at' ]
          }

        let(:conversation_id) { Conversation.create(title: 'Test').id }
        run_test!
      end

      response '404', 'conversation not found' do
        let(:conversation_id) { 'invalid' }
        run_test!
      end
    end

    post 'Creates a message' do
      tags 'Messages'
      consumes 'application/json'
      parameter name: :conversation_id, in: :path, type: :integer
      parameter name: :message, in: :body, schema: {
        type: :object,
        properties: {
          content: { type: :string }
        },
        required: [ 'content' ]
      }

      response '201', 'message created' do
        let(:conversation_id) { Conversation.create(title: 'Test').id }
        let(:message) { { content: 'Hello' } }
        run_test!
      end

      response '422', 'invalid request' do
        let(:conversation_id) { Conversation.create(title: 'Test').id }
        let(:message) { { content: '' } }
        run_test!
      end
    end
  end
end
