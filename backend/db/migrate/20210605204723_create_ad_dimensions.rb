class CreateAdDimensions < ActiveRecord::Migration[6.1]
  def change
    create_table :ad_dimensions do |t|
      t.integer :width
      t.integer :height

      t.timestamps
    end
  end
end
