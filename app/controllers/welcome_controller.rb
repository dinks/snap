class WelcomeController < ApplicationController

  def index
    redirect_to trips_path if signed_in?
  end

end
