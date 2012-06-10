require 'sinatra'
require 'json'

class NimboApp < Sinatra::Base
 
  set :suites_dir, File.expand_path(File.join(File.dirname(__FILE__), '../suites'))

  get '/' do
    erb :home
  end

  post '/test' do
    suite_id = `uuid`
    suite_dir = File.join settings.suites_dir, suite_id
    archive = params['suite_archive'][:tempfile].path

    system("mkdir #{suite_dir}")
    system("tar -xf #{archive} -C #{suite_dir}")
    
    { status: 'ok' }.to_json
  end
end
