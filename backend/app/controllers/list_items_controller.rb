class ListItemsController < ApplicationController
  def create
    list_item = ListItem.new(message: params[:message])
    user = User.find_by(id: params[:user_id])
    user.list.list_items << list_item
    list_item.save
    user.save
    render json: list_item, status: 200, message: "Successfully created user list item."
  end
end
