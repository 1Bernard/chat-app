class ConversationSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title
  has_many :messages
end
