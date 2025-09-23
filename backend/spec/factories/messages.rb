FactoryBot.define do
  factory :message do
    content { Faker::Lorem.sentence }
    role { [ :user, :bot ].sample }
    association :conversation
  end
end
