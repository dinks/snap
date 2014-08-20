class Api::V1::TripsController < ApplicationController
  before_filter :authorize

  respond_to :json

  def index
    @travel_logs = current_user.travel_logs
    if @travel_logs.empty?
      @travel_logs << TravelLog.start_log
    end
  end

  def create
    current_user.create_travel_log(params.require(:points))
    @travel_logs = current_user.travel_logs
    render :index
  end

end
