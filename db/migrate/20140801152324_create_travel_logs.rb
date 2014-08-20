class CreateTravelLogs < ActiveRecord::Migration
  def change
    create_table :travel_logs do |t|

      t.integer         :user_id
      t.integer         :source_id
      t.integer         :destination_id
      t.integer         :point_x,         default: 0
      t.integer         :point_y,         default: 0
      t.integer         :points,          default: 0

      t.timestamps
    end
  end
end
