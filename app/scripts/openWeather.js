'use strict';
var App = Ember.Application.create();

//OpenWeather url mapping
App.OpenWeatherUrlObject = Ember.Object.extend({
	host: 'http://openweathermap.org',
	hostApi: 'http://api.openweathermap.org/data/2.5/',
	key: '1111111111', // Update with your own key

	search: function() {
		var key = this.get('key');
		return this.get('hostApi') + 'find?units=imperial&type=like' + ( key ? '&APPID=' + key : '') + '&q=';
	}.property('hostApi', 'key')
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