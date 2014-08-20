class TravelLog < ActiveRecord::Base

  MAXIMUM_POINTS = 100

  belongs_to :user

  def self.start_log
    TravelLog.new(
      source_id:        Travelable.locations.first.id,
      destination_id:   Travelable.locations.second.id
    )
  end

  def source
    Travelable.locations.select { |l| l.id == source_id }.first
  end

  def destination
    Travelable.locations.select { |l| l.id == destination_id }.first
  end

  def next_destination
    destination_index = (Travelable.locations.map(&:id).index(destination_id) + 1) % Travelable.locations.length
    Travelable.locations[destination_index]
  end

  def has_maximum_points?
    points >= MAXIMUM_POINTS
  end

  def add_points(points)
    calculated_points   = self.points + points.to_i
    carry_over_points   = calculated_points - MAXIMUM_POINTS
    self.point_x        = self.point_y
    self.point_y        = calculated_points

    if carry_over_points >= 0
      self.points   = MAXIMUM_POINTS
      self.point_y  = MAXIMUM_POINTS
    else
      self.points   = calculated_points
    end

    save

    carry_over_points
  end
end
