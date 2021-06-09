# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Clear DB each time seed file is run.
Platform.delete_all
AdDimension.delete_all
User.delete_all
List.delete_all
ListItem.delete_all

# Creation of ad platforms
platform_names = [
  'Facebook',
  'Google',
  'Yahoo',
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
  e = AdDimension.new(name: ad[:name], width: ad[:width], height: ad[:height])
  fb = Platform.find_by(name: 'Facebook')
  e.platform = fb
  e.save
end

# Creation of Google ad dimensions
google_ad_dimensions = [
  {name: 'Small Square', width: 200, height: 200},
  {name: 'Vertical rectangle', width: 240, height: 400},
  {name: 'Square', width: 250, height: 250},
  {name: 'Triple Widescreen', width: 250, height: 360},
  {name: 'Inline Rectangle', width: 300, height: 250},
  {name: 'Large Rectangle', width: 336, height: 280},
  {name: 'Netboard', width: 580, height: 400},
  {name: 'Skyscraper', width: 120, height: 600},
  {name: 'Wide Skyscraper', width: 160, height: 600},
  {name: 'Half-Page Ad', width: 300, height: 600},
  {name: 'Portrait', width: 300, height: 1050},
  {name: 'Banner', width: 468, height: 60},
  {name: 'Leaderboard', width: 728, height: 90},
  {name: 'Top Banner', width: 930, height: 180},
  {name: 'Large Leaderboard', width: 970, height: 90},
  {name: 'Billboard', width: 970, height: 250},
  {name: 'Panorama', width: 980, height: 120},
  {name: 'Mobile Banner', width: 300, height: 50},
  {name: 'Mobile Banner V2', width: 320, height: 50},
  {name: 'Large Mobile Banner', width: 320, height: 100}
]

google_ad_dimensions.each do |ad|
  e = AdDimension.new(name: ad[:name], width: ad[:width], height: ad[:height])
  google = Platform.find_by(name: 'Google')
  e.platform = google
  e.save
end

# Creation of Yahoo ad dimensions
yahoo_ad_dimensions = [
  {name: 'Main Image', width: 1200, height: 627},
  {name: 'Icon Image', width: 82, height: 82},
  {name: 'Sponsor Marker - Small', width: 20, height: 20},
  {name: 'Sponsor Marker – Large', width: 40, height: 40}
]

yahoo_ad_dimensions.each do |ad|
  e = AdDimension.new(name: ad[:name], width: ad[:width], height: ad[:height])
  yahoo = Platform.find_by(name: 'Yahoo')
  e.platform = yahoo
  e.save
end

# Creation of several users
user_info = [
  {email: 'test@gmail.com'},
  {email: 'test@aol.com'},
  {email: 'test@yahoo.com'}
]

user_info.each do |user|
  new_user = User.new(email: user[:email])
  new_user.save
end

# Create a list for each user
list_info = [
  {title: 'My ToDo List'},
  {title: 'Things to Complete'},
  {title: 'Ads to Make'}
]

list_info.each do |list|
  new_list = List.new(title: list[:title])
  list_index = list_info.index(list)
  new_list.user = User.all[list_index]
  new_list.save
end

# Create list items for each list
list_item_info = [
  [
    {message: 'start ad performance presentation'},
    {message: 'export GA data for coporate account'},
    {message: 'adjust bid for Smith account on FB'}
  ],
  [
    {message: 'finish account set up for Embers Media'},
    {message: 'schedule meeting for ad package'}
  ],
  [
    {message: 'create Google ad set for Flaura Co.'},
    {message: 'submit insurance enrollment by COB today'},
    {message: 'remember to take a deep breath'}
  ]
]

list_item_info.each do |item_group|
  item_group_index = list_item_info.index(item_group)
  item_group.each do |item|
    new_list_item = ListItem.new(message: item[:message])
    new_list_item.list = List.all[item_group_index]
    new_list_item.save
  end
end