FactoryBot.define do
  factory :conversation do
    title { "Test Conversation" }

    trait :with_messages do
      after(:create) do |conversation|
        create_list(:message, 3, conversation: conversation)
      end
    end
  end
end
