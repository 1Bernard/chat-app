source "https://rubygems.org"

gem "rails", "~> 8.0.2", ">= 8.0.2.1"
gem "pg", "~> 1.1"
gem "puma", ">= 5.0"
gem "tzinfo-data", platforms: %i[ windows jruby ]
gem "solid_cache"
gem "solid_queue"
gem "solid_cable"

gem "bootsnap", require: false
gem "kamal", require: false
gem "thruster", require: false

# API
gem "fast_jsonapi"
gem "rack-cors"
gem "pry-rails"
gem "dotenv-rails", "~> 3.1", ">= 3.1.8"
gem "rubocop", "~> 1.80", ">= 1.80.2"

# Testing
gem "rspec-rails"
gem "factory_bot_rails"
gem "faker"
gem "shoulda-matchers"

# Documentation
gem "rswag-api"
gem "rswag-ui"

group :development, :test do
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"
  gem "brakeman", require: false
  gem "rubocop-rails-omakase", require: false
  gem "rspec-rails"
  gem "rswag-specs"
end
