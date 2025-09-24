class MessageSerializer
  include FastJsonapi::ObjectSerializer

  attributes :content, :role, :conversation_id, :created_at, :updated_at
  belongs_to :conversation
end
