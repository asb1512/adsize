class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :list
  has_one :list, serializer: ListSerializer
end
