require 'rails_helper'

RSpec.configure do |config|
  config.openapi_root = Rails.root.to_s + '/swagger'

  # Define OpenAPI documents
  config.openapi_specs = {
    'v1/openapi.json' => {
      openapi: '3.0.1',
      info: {
        title: 'Chat API',
        version: 'v1',
        description: 'API documentation for the Chat Application'
      },
      servers: [
        {
          url: 'http://{defaultHost}',
          variables: {
            defaultHost: {
              default: 'localhost:3000'
            }
          }
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: :http,
            scheme: :bearer
          }
        },
        schemas: {
          errors_object: {
            type: :object,
            properties: {
              errors: { type: :object }
            }
          },
          conversation: {
            type: :object,
            properties: {
              id: { type: :integer },
              title: { type: :string },
              created_at: { type: :string, format: 'date-time' },
              updated_at: { type: :string, format: 'date-time' }
            }
          },
          message: {
            type: :object,
            properties: {
              id: { type: :integer },
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

  config.openapi_format = :json
end
