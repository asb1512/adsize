class AddPlatformIdToAdDimensions < ActiveRecord::Migration[6.1]
  def change
    add_column :ad_dimensions, :platform_id, :integer
  end
end
