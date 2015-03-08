'use strict';
// Router info
App.Router.map(function() {
  this.resource('chartjs', function(){
    this.route('weather', {path: 'weather/:address'});
  });
  this.resource('d3', function(){
    this.route('weather', {path: 'weather/:address'});
  });
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('chartjs');
  }
});

// Search MVC
App.SearchController = Ember.ObjectController.extend({
  searchText: '',
  isCitySelected: false,
  isCitySearching: false,

  model: {
    geoResults: {},
    hasResults: false,
    selectedCity: {}
  },
  
  actions: {
    searchCity: function() {
      var self = this;
      var geocoder =  new google.maps.Geocoder();
      geocoder.geocode( { 'address': this.get('searchText')}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          self.set('isCitySearching', true);
          self.set('isCitySelected', false);

          self.set('model.geoResults', results);
          self.set('model.hasResults', results.length > 0);
          self.set('model.selectedCity', {});
          
          if(results.length === 1) {
             self.send('selectCity', results[0]); // Send the first city.
           } else {
            var currentRouteName = self.parentController.currentRouteName;
            if (!_.endsWith(currentRouteName, '.index')) {
              self.transitionToRoute(self.parentController.currentRouteName.split('.')[0].concat('.index'));
            }
          }
        }
      });
    },
    selectCity: function(geoLoc) {
      // Update City Selection.
      /*jshint camelcase: false */
      var self = this;
      $.getJSON(URLs.geoLocation(geoLoc.geometry.location.lat(), geoLoc.geometry.location.lng())).done(function(data) {
        self.set('isCitySearching', false);
        self.set('isCitySelected', true);      
        self.set('searchText', geoLoc.formatted_address);
        self.set('model.selectedCity', data);

        var route = self.parentController.currentRouteName.split('.')[0].concat('.weather');
        self.transitionToRoute(route, geoLoc.formatted_address);
      });
    }
  }
});