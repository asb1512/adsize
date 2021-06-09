class ListSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :list_items, serializer: ListItemSerializer
end
