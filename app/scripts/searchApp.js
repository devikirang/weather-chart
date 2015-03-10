'use strict';
// Router info
App.Router.map(function() {
  this.route('city', {path: 'city/:city_faddress/:city_coord_lat/:city_coord_lon'}, function() {
    this.route('chartjs');
    this.route('d3');
  });
});

//MVC
App.IndexController = Ember.ObjectController.extend({
  searchText: '',
  isCitySearch: false,
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
              return { 'address': result.formatted_address, 'lat': result.geometry.location.lat(), 'lon': result.geometry.location.lng() }
            });

            if(geoResults.length === 1) {
              self.send('selectCity', geoResults[0]); // Send the first city.
            } else {
              self.set('isCitySearch', true);
              self.set('model.geoResults', geoResults);
              self.set('model.hasResults', (geoResults.length > 0));
            }
          }
        });
      } else {
        this.set('isCitySearch', true);
        this.set('model.geoResults', []);
        this.set('model.hasResults', false);
      }
    },
    selectCity: function(city) {
      // Update City Selection.
      var self = this;
      $.getJSON(URLs.geoLocation(city.lat, city.lon)).done(function(data) {
        self.set('isCitySearch', false);
        self.set('isCitySelected', true);

        self.set('searchText', city.address);
        data.address = city.address;
        data.faddress = city.address.replace(/\s+/g, '-');

        self.set('model.city', data);
        //self.transitionToRoute('city', data); TODO
      });
    }
  }
});

App.CityRoute = Ember.Route.extend({ 
  model: function (params){
    console.log('selected city model', params);
    return {
      'city': {
        'address': params.faddress,
        'lat': params.lat,
        'lon': params.lon
      }
    }
  }
});

App.CityController = Ember.ObjectController.extend({
  needs:['index'],
  actions: {

  }
});