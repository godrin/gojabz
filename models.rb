require 'data_mapper'
require 'digest/sha2.rb'

DataMapper.setup(:default, 'sqlite://'+File.expand_path('../database.db',__FILE__))


class User
  include DataMapper::Resource
  property :id, Serial  
  property :username,String
  property :seed,String
  property :password,String
  property :secret,String
  
  @@digest||=Digest::SHA2.new
  def self.digest(word)
    hex=""
    @@digest.digest(word.to_s).each_byte{|b|hex+=format("%x",b)}
      
      hex
  end
  
  def setUserPassword(name,pw)
    self.seed=User.digest(Random.rand+Time.now)
    self.password=User.digest(pw+seed)
    self.username=name
  end
end

DataMapper.auto_upgrade!
