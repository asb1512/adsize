Rails.application.routes.draw do
  resources :list_items
  resources :lists
  resources :users, only: [:create]
  resources :platforms, only: [:index, :show] do
    resources :ad_dimensions, only: [:index, :show]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
