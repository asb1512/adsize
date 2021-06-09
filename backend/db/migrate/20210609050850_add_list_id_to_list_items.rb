class AddListIdToListItems < ActiveRecord::Migration[6.1]
  def change
    add_column :list_items, :list_id, :integer
  end
end
