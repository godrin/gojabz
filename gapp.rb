require 'sinatra'
require 'json'
require 'pp'
require './models.rb'

set :public_folder,'public'

get '/' do
  redirect '/index.html'
end
get '/friends' do
  content_type :json
  "HI"
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
