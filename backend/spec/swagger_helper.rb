require 'rails_helper'

RSpec.configure do |config|
  config.openapi_root = Rails.root.to_s + '/swagger'

  # Define OpenAPI documents
  config.openapi_specs = {
    'v1/swagger.yaml' => {
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
          # Error schemas
          error_object: {
            type: :object,
            properties: {
              error: { 
                type: :string,
                example: 'Not Found'
              },
              message: {
                type: :string,
                example: 'Conversation not found'
              }
            }
          },
          errors_object: {
            type: :object,
            properties: {
              errors: { 
                type: :array,
                items: { type: :string },
                example: ["Content can't be blank"]
              }
            }
          },
          # Success schemas
          conversation_response: {
            type: :object,
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
                  },
                  relationships: {
                    type: :object,
                    properties: {
                      messages: {
                        type: :object,
                        properties: {
                          data: {
                            type: :array,
                            items: {
                              type: :object,
                              properties: {
                                id: { type: :string },
                                type: { type: :string }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          conversations_response: {
            type: :object,
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
          },
          # CHANGE: Update message_response to expect array for create response
          message_response: {
            type: :object,
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
                    },
                    relationships: {
                      type: :object,
                      properties: {
                        conversation: {
                          type: :object,
                          properties: {
                            data: {
                              type: :object,
                              properties: {
                                id: { type: :string },
                                type: { type: :string }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          messages_response: {
            type: :object,
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
          }
        }
      }
    }
  }

  config.openapi_format = :yaml
end