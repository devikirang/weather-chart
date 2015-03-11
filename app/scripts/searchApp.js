'use strict';
// Router info
App.Router.map(function() {
  this.route('weather');
  this.route('city', {path: 'city/:faddress/:lat/:lon'}, function() {
    this.route('chartjs');
    this.route('d3');
  });
});

var SelectedCity = {};

//MVC
App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('weather');
  }
});

App.WeatherController = Ember.ObjectController.extend({
  searchText: '',
  isCitySearch: false,
  isCitySelected: false,
  model: {
    geoResults: [],
    hasResults: false,
    city: {}
  },
  actions: {
    searchCity: function() {
      var searchText = this.get('searchText');
      if (searchText) {
        var self = this;
        var geocoder =  new google.maps.Geocoder();
        geocoder.geocode( { 'address': this.get('searchText')}, function(resultsData, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            var geoResults = _.map(resultsData, function(result) { 
              /*jshint camelcase: false */
              return { 'daddress': result.formatted_address,  'faddress' : result.formatted_address.replace(/\s+/g, '-'), 'lat': result.geometry.location.lat(), 'lon': result.geometry.location.lng() }
            });

            if(geoResults.length === 1) {
              self.send('selectCity', geoResults[0]); // Send the first city.
            } else {
              self.set('isCitySearch', true);
              self.set('isCitySelected', false);
              self.set('model.geoResults', geoResults);
              self.set('model.hasResults', (geoResults.length > 0));
            }
          }
        });
      } else {
        this.set('isCitySearch', true);
        this.set('isCitySelected', false);
        this.set('model.geoResults', []);
        this.set('model.hasResults', false);
      }
    },
    selectCity: function(geoCity) {
      // Update City Selection.
      var self = this;
      $.getJSON(URLs.geoLocation(geoCity.lat, geoCity.lon)).done(function(data) {
        self.set('isCitySearch', false);
        self.set('isCitySelected', true);
        geoCity.wCityData = data;
        SelectedCity = geoCity;

        self.transitionToRoute('city', geoCity);
      });
    }
  }
});

App.CityRoute = Ember.Route.extend({

});

App.CityController = Ember.ObjectController.extend({
  actions: {

  }
});