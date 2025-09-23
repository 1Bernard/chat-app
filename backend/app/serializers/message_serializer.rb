# app/serializers/message_serializer.rb
class MessageSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :content, :role, :conversation_id, :created_at, :updated_at
  
  # Ensure dates are formatted as ISO 8601
  attribute :created_at do |object|
    object.created_at.iso8601
  end
  
  attribute :updated_at do |object|
    object.updated_at.iso8601
  end
end