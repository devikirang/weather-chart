'use strict';
var App = Ember.Application.create();

//OpenWeather url mapping
App.OpenWeatherUrlObject = Ember.Object.extend({
	host: 'http://openweathermap.org',
	hostApi: 'http://api.openweathermap.org/data/2.5/',

	search: function() {
		return this.get('hostApi') + 'find?units=metric&type=like&q=';
	}.property('hostApi')
});

var URLs = App.OpenWeatherUrlObject.create();

Ember.Handlebars.helper('img-flag', function(country) {
	if (country && country.length === 2) {
		var escaped = Handlebars.Utils.escapeExpression(country);
		return new Ember.Handlebars.SafeString('<img src="'+ URLs.get('host') +'/images/flags/'+ escaped.toLowerCase() +'.png">');
	} else {
		return '';
	}
});

Ember.Handlebars.helper('img-weather', function(icon) {
	var escaped = Handlebars.Utils.escapeExpression(icon);
	return new Ember.Handlebars.SafeString('<img src="'+ URLs.get('host') +'/img/w/'+ escaped +'.png">');
});