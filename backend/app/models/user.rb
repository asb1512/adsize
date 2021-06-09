class User < ApplicationRecord
  validates :email, presence: true
  validates :email, uniqueness: true
  # make sure to add data associations once all tables exist
  # has_many :reports
end
