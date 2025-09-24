require 'swagger_helper'

RSpec.describe 'Conversations API', type: :request do
  path '/api/v1/conversations' do
    get 'Retrieves all conversations' do
      tags 'Conversations'
      produces 'application/json'

      response '200', 'conversations found' do
        schema '$ref' => '#/components/schemas/conversations_response'
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
              title: { 
                type: :string,
                description: 'Optional title. If blank, will be auto-generated as "Conversation {number}"'
              }
            }
          }
        }
      }

      response '201', 'conversation created' do
        schema '$ref' => '#/components/schemas/conversation_response'
        let(:conversation) { { conversation: { title: 'New Conversation' } } }
        run_test!
      end

      # CHANGE: Update to test for title that's too long instead of blank
      response '422', 'invalid request' do
        schema '$ref' => '#/components/schemas/errors_object'
        let(:conversation) { { conversation: { title: 'a' * 256 } } } # 256 characters - too long
        run_test!
      end
    end
  end

  path '/api/v1/conversations/{id}' do
    get 'Retrieves a conversation' do
      tags 'Conversations'
      produces 'application/json'
      parameter name: :id, in: :path, type: :string

      response '200', 'conversation found' do
        schema '$ref' => '#/components/schemas/conversation_response'
        let(:id) { create(:conversation).id.to_s }
        run_test!
      end

      response '404', 'conversation not found' do
        schema '$ref' => '#/components/schemas/error_object'
        let(:id) { 'invalid' }
        run_test!
      end
    end

    delete 'Deletes a conversation' do
      tags 'Conversations'
      parameter name: :id, in: :path, type: :string

      response '204', 'conversation deleted' do
        let(:id) { create(:conversation).id.to_s }
        run_test!
      end

      response '404', 'conversation not found' do
        schema '$ref' => '#/components/schemas/error_object'
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end
end