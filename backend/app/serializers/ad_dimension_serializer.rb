class AdDimensionSerializer < ActiveModel::Serializer
  attributes :id, :name, :width, :height, :platform
  belongs_to :platform, serializer: PlatformSerializer
end