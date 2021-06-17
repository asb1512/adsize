class ListItemsController < ApplicationController
  def create
    list_item = ListItem.new(message: params[:message])
    user = User.find_by(id: params[:user_id])
    user.list.list_items << list_item
    list_item.save
    user.save
    render json: list_item, status: 200, message: "Successfully created user list item."
  end

  def destroy
    list_item = ListItem.find_by(id: params[:id])
    if list_item
      list_item.destroy
      render status: 200
    else
      render status: 400, message: "Request note does not exist."
    end
  end
end
