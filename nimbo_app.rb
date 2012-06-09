require 'sinatra'
require 'json'

class NimboApp < Sinatra::Base
 
  set :suites_dir, File.expand_path(File.join('..', File.dirname(__FILE__), 'suites'))

  get '/' do
    erb :home
  end

  post '/test' do
    file_name = File.join(settings.suites_dir, params['suite_archive'][:filename])
    File.open(file_name, "w") do |f|
        f.write(params['suite_archive'][:tempfile].read)
    end
    { status: 'ok' }.to_json
  end

end
