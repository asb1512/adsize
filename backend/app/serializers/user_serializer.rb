class UserSerializer < ActiveModel::Serializer
  attributes :id, :email
  has_one :list, serializer: ListSerializer
end
