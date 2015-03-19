'use strict';
// Router info
App.Router.map(function() {
  this.route('weather', function() {
    this.route('city', {
      path: 'city/:faddress/:lat/:lon'
    });
  });
});

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
  setData: function(isCitySearch, isCitySelected, geoResults, hasResults) {
    this.set('isCitySearch', isCitySearch);
    this.set('isCitySelected', isCitySelected);
    this.set('model.geoResults', geoResults);
    this.set('model.hasResults', hasResults);
  },
  actions: {
    searchCity: function() {
      var searchText = this.get('searchText');
      if (searchText) {
        var self = this;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          'address': this.get('searchText')
        }, function(resultsData, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            var geoResults = _.map(resultsData, function(result) {
              return {
                /*jshint camelcase: false */
                'daddress': result.formatted_address,
                'faddress': result.formatted_address.replace(/\s+/g, '-'),
                'lat': result.geometry.location.lat(),
                'lon': result.geometry.location.lng()
              };
            });

            if (geoResults.length === 1) {
              self.send('selectCity', geoResults[0]); // Send the first city.
            } else {
              self.setData(true, false, geoResults, (geoResults.length > 0));
            }
          } else {
            self.setData(true, false, [], false);
          }
        });
      } else {
        this.setData(true, false, [], false);
      }
    },
    selectCity: function(geoCity) {
      // Update City Selection.
      var self = this;
      AppAjaxService.doGetCall(URLs.geoLocation(geoCity.lat, geoCity.lon), function(data) {
        self.set('isCitySearch', false);
        self.set('isCitySelected', true);
        geoCity.wCityData = data;

        self.transitionToRoute('weather.city', geoCity);
      });
    }
  }
});
