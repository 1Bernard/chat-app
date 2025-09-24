FactoryBot.define do
  factory :message do
    content { "Test message" }
    role { :user }
    association :conversation

    trait :bot do
      role { :bot }
      content { "Bot response" }
    end

    trait :user do
      role { :user }
      content { "User message" }
    end
  end
end
