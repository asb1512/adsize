class UsersController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user
      render status: "200", json: {message: "Successfully authenticated", user: user}
    else
      created_user = User.create(email: params[:email])
      render status: "200", json: {message: "Your account was successfully created", user: created_user}
    end
  end
end
