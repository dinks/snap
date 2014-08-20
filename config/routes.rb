Rails.application.routes.draw do

  resources :trips, only: :index

  namespace :api do
    api_version(module: "V1", header: { name: "Accept", value: "application/vnd.snap.dev; version=1" }) do
      resources :trips, only: [ :index, :create ]
    end
  end

  root 'welcome#index'

end
