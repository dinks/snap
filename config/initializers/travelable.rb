class Travelable < Settingslogic
  source "#{Rails.root}/config/travelable.yml"
  namespace Rails.env
end
