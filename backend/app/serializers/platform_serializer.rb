class PlatformSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :ad_dimensions, serializer: AdDimensionSerializer
end