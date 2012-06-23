require 'sinatra'
require 'yaml'
require 'json'

module Nimbo
  class App < Sinatra::Base

    suites = []
    results = {}

    get '/capture' do
      erb :capture
    end

    get '/status' do
      status = "status:<br>"
      results.each { |suite_id, result| status << "#{suite_id}: #{result}<br>" }
      status
    end

    get '/suite_get' do
      suites.pop.to_json
    end

    get '/suite_runner/:id' do
      suite_id = params[:id]
      config = YAML.load_file("public/suites/#{suite_id}/.nimbo.yml")
      @suite_id = suite_id
      @client_scripts = config["src"]
      erb :runner
    end

    get '/suite_run/:id' do
      suite_id = params[:id]
      suites << suite_id
      "added #{suite_id}"
    end

    post '/suite_result/:id' do
        results[params[:id]] = params[:result]
        "result: #{params[:result]}"
    end

  end
end
