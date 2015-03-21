#weather-chart

* Application built Using ember.js, Bootstrap, lodash.js, moment.js, Chart.js & jQuery JS libraries
* Temparature, Pressure, Rain & Snow Charts using openweathermap.org weather api.
	* Update `OPEN_WEATHER_API_KEY` in `app/scripts/initApp.js`
* Search city/ZIP using Google Maps API.
	* Update `GOOGLE_MAP_API_KEY` in `app/index.html`
* Using GMT time for charts (Need to use Google Time Zone API ).
* Used Grunt tool for build and deployment.

## _Software Installation_

Run the below commands to download required dependencies.

* Install <a href="https://nodejs.org/download/" target="_blank">node.js</a>
* `npm install -g bower`
* `npm install -g grunt-cli`
* `npm install`  - for node_modules
* `bower install` - for bower_components

## _Build & development_

* `grunt` to do clean, jshint, run tests and build.
* `grunt jshint` to check JavaScript syntax for any warnings and errors. 
* `grunt build` to build the app distribution.
* `grunt clean` to clean the app distribution.
* `grunt serve` to run the app with liveReload of app code.
* `grunt serve:dist` to run app against it's distribution.

## _Testing_
* `grunt test` to run the Jasmine tests.
  * 
  * Coverage reports: coverage folder has the html and json code
