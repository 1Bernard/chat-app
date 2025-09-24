require 'swagger_helper'

RSpec.describe 'Messages API', type: :request do
  path '/api/v1/conversations/{conversation_id}/messages' do
    get 'Retrieves all messages for a conversation' do
      tags 'Messages'
      produces 'application/json'
      parameter name: :conversation_id, in: :path, type: :string

      response '200', 'messages found' do
        schema type: :object,
          properties: {
            data: {
              type: :array,
              items: {
                type: :object,
                properties: {
                  id: { type: :string },
                  type: { type: :string },
                  attributes: {
                    type: :object,
                    properties: {
                      content: { type: :string },
                      role: { type: :string },
                      conversation_id: { type: :integer },
                      created_at: { type: :string, format: 'date-time' },
                      updated_at: { type: :string, format: 'date-time' }
                    }
                  }
                }
              }
            }
          }

        let(:conversation_id) { create(:conversation).id.to_s }
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
      parameter name: :conversation_id, in: :path, type: :string
      parameter name: :message, in: :body, schema: {
        type: :object,
        properties: {
          message: {
            type: :object,
            properties: {
              content: { type: :string }
            },
            required: ['content']
          }
        },
        required: ['message']
      }

      response '201', 'message created' do
        schema type: :object,
          properties: {
            data: {
              type: :object,
              properties: {
                id: { type: :string },
                type: { type: :string },
                attributes: {
                  type: :object,
                  properties: {
                    content: { type: :string },
                    role: { type: :string },
                    conversation_id: { type: :integer },
                    created_at: { type: :string, format: 'date-time' },
                    updated_at: { type: :string, format: 'date-time' }
                  }
                }
              }
            }
          }

        let(:conversation_id) { create(:conversation).id.to_s }
        let(:message) { { message: { content: 'Hello' } } }
        run_test!
      end

      response '422', 'invalid request - empty content' do
        let(:conversation_id) { create(:conversation).id.to_s }
        let(:message) { { message: { content: '' } } }
        run_test!
      end

      response '404', 'conversation not found' do
        let(:conversation_id) { 'invalid' }
        let(:message) { { message: { content: 'Test message' } } }
        run_test!
      end
    end
  end
end