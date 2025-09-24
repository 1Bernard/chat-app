require 'swagger_helper'

RSpec.describe 'Conversations API', type: :request do
  path '/api/v1/conversations' do
    get 'Retrieves all conversations' do
      tags 'Conversations'
      produces 'application/json'

      response '200', 'conversations found' do
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
                      title: { type: :string },
                      created_at: { type: :string, format: 'date-time' },
                      updated_at: { type: :string, format: 'date-time' }
                    }
                  }
                }
              }
            }
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
              title: { 
                type: :string,
                description: 'Optional title. If blank, will be auto-generated as "Conversation {number}"'
              }
            }
          }
        }
      }

      response '201', 'conversation created with title' do
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
                    title: { type: :string },
                    created_at: { type: :string, format: 'date-time' },
                    updated_at: { type: :string, format: 'date-time' }
                  }
                }
              }
            }
          }

        let(:conversation) { { conversation: { title: 'New Conversation' } } }
        run_test!
      end

      response '201', 'conversation created with default title when empty' do
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
                    title: { type: :string },
                    created_at: { type: :string, format: 'date-time' },
                    updated_at: { type: :string, format: 'date-time' }
                  }
                }
              }
            }
          }

        let(:conversation) { { conversation: { title: '' } } }
        run_test! do |response|
          data = JSON.parse(response.body)['data']
          expect(data['attributes']['title']).to match(/Conversation \d+/)
        end
      end

      response '201', 'conversation created with default title when title is nil' do
        let(:conversation) { { conversation: { title: nil } } }
        run_test! do |response|
          data = JSON.parse(response.body)['data']
          expect(data['attributes']['title']).to match(/Conversation \d+/)
        end
      end
    end
  end

  path '/api/v1/conversations/{id}' do
    get 'Retrieves a conversation' do
      tags 'Conversations'
      produces 'application/json'
      parameter name: :id, in: :path, type: :string

      response '200', 'conversation found' do
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
                    title: { type: :string },
                    created_at: { type: :string, format: 'date-time' },
                    updated_at: { type: :string, format: 'date-time' }
                  }
                }
              }
            }
          }

        let(:id) { create(:conversation).id.to_s }
        run_test!
      end

      response '404', 'conversation not found' do
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
        let(:id) { 'invalid' }
        run_test!
      end
    end
  end
end