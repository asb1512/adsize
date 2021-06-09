class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
  # make sure to add data associations once all tables exist
end
