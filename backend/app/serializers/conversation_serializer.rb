class ConversationSerializer
  include FastJsonapi::ObjectSerializer

  attributes :title, :created_at, :updated_at
  has_many :messages
end