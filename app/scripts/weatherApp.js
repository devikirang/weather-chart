'use strict';
var App = Ember.Application.create();

//OpenWeather url mapping
App.OpenWeatherUrlObject = Ember.Object.extend({
	host: 'http://openweathermap.org',
	hostApi: 'http://api.openweathermap.org/data/2.5',
	key: '1111111111', // Update with your own key
	units: 'imperial',

	queryData: function(data) {
		var ret = [];
		for (var d in data) {
			ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
		}
		return ret.join('&');
	},

	commonParams: function() {
		return {'units': this.get('units'), 'APPID': this.get('key')};
	},

	search: function(searchText) {
		var data = this.commonParams();
		data.q = searchText;
		return this.get('hostApi') + '/find?'+ this.queryData(data);
	}, 

	cityId: function(id) {
		var data = this.commonParams();
		data.id = id;
		return this.get('hostApi') + '/weather?' + this.queryData(data);
	},

	location: function(lat, lon) {
		var data = this.commonParams();
		data.lat = lat;
		data.lon = lon;
		return this.get('hostApi') + '/weather?' + this.queryData(data);
	},

	forecast: function(id) {
		var data = this.commonParams();
		data.id = id;
		return this.get('hostApi') + '/forecast?' + this.queryData(data);
	},
	map: function(lat, lon) {
		var data = {'lat': lat, 'lon': lon, 'zoom': 12, 'layers': 'B0FTTFF'};
		return this.get('host') + '/Maps?' + this.queryData(data);
	}
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

Ember.Handlebars.helper('weather-map', function(lat, lon) {
	return new Ember.Handlebars.SafeString('<a class="btn btn-link" target="_blank" href="'+ URLs.map(lat, lon) + 
		'"><span class="glyphicon glyphicon-new-window"></span> Map</a>');
});