'use strict';
window.App = Ember.Application.create();

//OpenWeather url mapping
App.OpenWeatherUrlObject = Ember.Object.extend({
	host: 'http://api.openweathermap.org/data/2.5/',

	search: function() {
		return this.get('host') + 'find?units=metric&type=like&q=';
	}.property('host')
});

var urls = App.OpenWeatherUrlObject.create();