class ListSerializer < ActiveModel::Serializer
  attributes :id, :title, :list_items
  has_many :list_items, serializer: ListItemSerializer
end
