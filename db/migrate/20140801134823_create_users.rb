class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|

      t.string          :email,              null: false, default: ""
      t.string          :encrypted_password, null: false, default: ""
      t.string          :remember_token
      t.integer         :total_points,      default: 0

      t.timestamps
    end
  end
end
