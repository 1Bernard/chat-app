class CreateMessages < ActiveRecord::Migration[8.0]
  def change
    create_table :messages do |t|
      t.references :conversation, null: false, foreign_key: true
      t.text :content
      t.integer :role, default: 0

      t.timestamps
    end
  end
end
