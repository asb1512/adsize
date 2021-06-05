class AddNameToAdDimensions < ActiveRecord::Migration[6.1]
  def change
    add_column :ad_dimensions, :name, :string
  end
end
