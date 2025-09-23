require 'swagger_helper'

RSpec.describe 'Conversations API', type: :request do
  path '/api/v1/conversations' do
    get 'Retrieves all conversations' do
      tags 'Conversations'
      produces 'application/json'

      response '200', 'conversations found' do
        schema type: :array,
          items: {
            type: :object,
            properties: {
              id: { type: :integer },
              title: { type: :string },
              created_at: { type: :string, format: 'date-time' },
              updated_at: { type: :string, format: 'date-time' }
            },
            required: [ 'id', 'title', 'created_at', 'updated_at' ]
          }

        run_test!
      end
    end

    post 'Creates a conversation' do
      tags 'Conversations'
      consumes 'application/json'
      parameter name: :conversation, in: :body, schema: {
        type: :object,
        properties: {
          conversation: {
            type: :object,
            properties: {
              title: { type: :string }
            },
            required: [ 'title' ]
          }
        },
        required: [ 'conversation' ]
      }

      response '201', 'conversation created' do
        let(:conversation) { { conversation: { title: 'New Conversation' } } }
        run_test!
      end

      response '422', 'invalid request' do
        let(:conversation) { { conversation: { title: '' } } }
        run_test!
      end
    end
  end

  path '/api/v1/conversations/{id}' do
    get 'Retrieves a conversation' do
      tags 'Conversations'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer

      response '200', 'conversation found' do
        schema type: :object,
          properties: {
            id: { type: :integer },
            title: { type: :string },
            created_at: { type: :string, format: 'date-time' },
            updated_at: { type: :string, format: 'date-time' }
          },
          required: [ 'id', 'title', 'created_at', 'updated_at' ]

        let(:id) { Conversation.create(title: 'Test').id }
        run_test!
      end

      response '404', 'conversation not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end

    delete 'Deletes a conversation' do
      tags 'Conversations'
      parameter name: :id, in: :path, type: :integer

      response '204', 'conversation deleted' do
        let(:id) { Conversation.create(title: 'Test').id }
        run_test!
      end

      response '404', 'conversation not found' do
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end
end
