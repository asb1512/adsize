class PlatformsController < ApplicationController
  def index
    platforms = Platform.all
    render json: platforms, status: 200
  end
end
