class Conversation < ApplicationRecord
  has_many :messages, dependent: :destroy

  validates :title, presence: true

  before_validation :set_default_title, on: :create
  after_create :create_initial_message

  private

  def set_default_title
    return if title.present?

    # Find the highest conversation number and add 1
    latest_number = Conversation.where("title LIKE ?", "Conversation %")
                               .map { |c| c.title.match(/Conversation (\d+)/)&.captures&.first.to_i }
                               .max || 0

    self.title = "Conversation #{latest_number + 1}"
  end

  def create_initial_message
    messages.create!(content: "How can I help you?", role: :bot)
  end
end