require 'rails_helper'

RSpec.describe Message, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:content) }
    it { should validate_presence_of(:role) }
  end

  describe 'associations' do
    it { should belong_to(:conversation) }
  end

  describe 'enums' do
    it { should define_enum_for(:role).with_values(user: 0, bot: 1) }
  end
end
