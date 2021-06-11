Rails.application.routes.draw do
  resources :users, only: [:index, :create] do
    resources :lists, only: [:show] do
      resources :list_items
    end
  end

  resources :platforms, only: [:index, :show] do
    resources :ad_dimensions, only: [:index, :show]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
