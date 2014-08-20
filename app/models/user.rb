class User < ActiveRecord::Base
  include Clearance::User

  has_many :travel_logs

  after_create :start_travel_log

  def create_travel_log(points)
    if travel_logs.empty?
      start_travel_log(
        Travelable.locations.first.id,
        Travelable.locations.second.id,
        points
      )
    else
      current_travel_log = travel_logs.last

      carry_over_points = current_travel_log.add_points(points)

      if current_travel_log.has_maximum_points?
        start_travel_log(
          current_travel_log.destination_id,
          current_travel_log.next_destination.id,
          carry_over_points
        )
      end
    end
  end

  private

  def start_travel_log(source_id, destination_id, points)
    travel_logs.create(
      source_id:        source_id,
      destination_id:   destination_id,
      point_x:          0,
      point_y:          points,
      points:           points
    )
  end

end
