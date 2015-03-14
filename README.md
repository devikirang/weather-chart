#weather-chart

* Application built Using ember.js, Bootstrap. lodash.js, moment.js, chart.js & jQuery JS libraries
* Temparature, Pressure, Rain & Show Charts using openweathermap.org weather api.
	* Update `OPEN_WEATHER_API_KEY` in `app/scripts/initApp.js`
* Search city/ZIP using Google Maps API.
	* Update `GOOGLE_MAP_API_KEY` in `app/index.html`
* TODO need to use local Time Zone for charts
* Used Grunt for build and deployment.

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