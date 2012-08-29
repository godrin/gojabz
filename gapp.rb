require 'sinatra'
require 'json'
require 'pp'
require './models.rb'

set :public_folder,'public'

Person=Struct.new(:name,:img,:location)
persons=[Person.new("Godrin","image/photo.jpg","Wtal"),
  Person.new("Purple","image/pic.jpg","Germany")]
class Person
  def to_json(*)
    {:name=>name,:img=>img,:location=>location}.to_json
  end
end

get '/' do
  redirect '/index.html'
end

get '/friends' do
  content_type :json
  persons.to_json
  #{:name=>"Godrin",:location=>"Wtal"}.to_json
end

get '/seed' do
  content_type :json
  User.digest(Random.rand).to_json
end

post '/login' do
  content_type :json
  pp params
  username=params["name"]
  secret=params["secret"]
  {"name"=>username,"secret"=>secret}.to_json
end

post '/user' do
  content_type :json
  user.setUserPassword(name,pw)
  # new user
  user=User.new
  name=param["name"]
  pw=param["password"]
  if User.passwordOk?(pw)
    user.setUserPassword(name,pw)
    user.save
    return true.to_json
  end
  return false.to_json
end
