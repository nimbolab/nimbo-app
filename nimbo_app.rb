require 'sinatra'
require 'rest_client'
require 'json'

module Nimbo
  class App < Sinatra::Base

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

      result = RestClient.get "http://localhost:4000/suite_run/#{suite_id}"
    end
  end
end
