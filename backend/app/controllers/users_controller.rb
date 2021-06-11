class UsersController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user
      render json: user, status: "200", message: "Successfully authenticated"
    else
      created_user = User.new(email: params[:email])
      new_list = List.new(title: 'My ToDo List')
      created_user.list = new_list
      new_list.save
      created_user.save
      render json: created_user, status: "200", message: "Successfully authenticated"
    end
  end
end
