class ListItemsController < ApplicationController
  def create
    binding.pry
    list_item = ListItem.new(message: params[:message])
  end
end
