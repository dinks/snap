json.key_format! camelize: :lower
json.trips @travel_logs do |travel_log|
  json.source do
    json.id     travel_log.source.id
    json.name   travel_log.source.name
    json.fact   travel_log.source.fact
    json.image  asset_path("travel/pepper#{travel_log.source.id}.png")
  end
  json.destination do
    json.id   travel_log.destination.id
    json.name travel_log.destination.name
    json.fact travel_log.destination.fact
    json.image  asset_path("travel/pepper#{travel_log.destination.id}.png")
  end
  json.x      travel_log.point_x
  json.y      travel_log.point_y
  json.points travel_log.points
end

json.max_points TravelLog::MAXIMUM_POINTS
