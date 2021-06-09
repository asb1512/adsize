class UsersController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user
      puts user
      render status: "200", json: {message: "user successfully authenticated"}
    else
      User.create(email: params[:email])
      render status: "200", json: {message: "user account successfully created"}
    end
  end
end
