# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Creation of ad platforms
platform_names = [
  'Facebook',
  'Google',
  'Yahoo',
  'Topple',
  'Display'
]

platform_names.each do |name|
  Platform.create(name: name)
end

# Creation of FB ad dimensions
fb_ad_dimensions = [
  {name: 'Standard', width: 1200, height: 628},
  {name: 'Sponsored Message', width: 1080, height: 1080},
  {name: 'Standard Carousel', width: 1080, height: 1080}
]

fb_ad_dimensions.each do |ad|
  e = AdDimension.create(name: ad.name, width: ad.width, height: ad.height)
  fb = Platform.find_by(name: 'Facebook')
  e.platform = fb
end