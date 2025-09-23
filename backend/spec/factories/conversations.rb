FactoryBot.define do
  factory :conversation do
    title { Faker::Lorem.words(number: 3).join(' ') }
  end
end
