class ListItemSerializer < ActiveModel::Serializer
  attributes :id, :message
  belongs_to :list
end
