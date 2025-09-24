require 'rails_helper'

RSpec.describe Conversation, type: :model do
  describe 'validations' do
    # No presence validation needed since we set default title
    it 'is valid with a blank title' do
      conversation = Conversation.new(title: '')
      expect(conversation).to be_valid
    end

    it 'is valid with a nil title' do
      conversation = Conversation.new(title: nil)
      expect(conversation).to be_valid
    end
  end

  describe 'associations' do
    it { should have_many(:messages).dependent(:destroy) }
  end

  describe 'callbacks' do
    describe 'before_validation' do
      it 'sets default title when title is blank' do
        conversation = Conversation.create(title: '')
        expect(conversation.title).to match(/Conversation \d+/)
      end

      it 'does not set default title when title is provided' do
        conversation = Conversation.create(title: 'Custom Title')
        expect(conversation.title).to eq('Custom Title')
      end

      it 'increments conversation number correctly' do
        conversation1 = Conversation.create(title: '')
        conversation2 = Conversation.create(title: '')

        number1 = conversation1.title.match(/Conversation (\d+)/)[1].to_i
        number2 = conversation2.title.match(/Conversation (\d+)/)[1].to_i

        expect(number2).to eq(number1 + 1)
      end
    end

    describe 'after_create' do
      it 'creates an initial message after creation' do
        conversation = Conversation.create(title: 'Test Conversation')
        expect(conversation.messages.count).to eq(1)
        expect(conversation.messages.first.content).to eq('How can I help you?')
        expect(conversation.messages.first.role).to eq('bot')
      end
    end
  end
end
