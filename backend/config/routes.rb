Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :conversations, only: [ :index, :show, :create, :destroy ] do
        resources :messages, only: [ :index, :create ]
      end
    end
  end

  # Swagger documentation
  mount Rswag::Ui::Engine => "/api-docs"
  mount Rswag::Api::Engine => "/api-docs"
end
