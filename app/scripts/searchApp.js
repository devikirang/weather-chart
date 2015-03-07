'use strict';
// Router info
App.Router.map(function() {
  this.resource('chartjs', function(){
    this.route('weather', {path: 'weather/:cityId'});
  });
  this.resource('d3', function(){
    this.route('weather', {path: 'weather/:cityId'});
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
  model: {},
  isCitySelected: false,
  isCitySearching: false,
  actions: {
    searchCity: function() {
      var self = this;
      $.getJSON(URLs.search(this.get('searchText'))).done(function(data) {
          self.set('model', data);
          self.set('model.hasResults', data.count);
          self.set('model.selectedCity', {});
          self.set('isCitySearching', true);
          self.set('isCitySelected', false);
          if(data.count === 1) {
             self.send('selectCity', data.list[0]); // Send the first city.
          }
      });
    },
    selectCity: function(city) {
      // Update City Selection.
      this.set('isCitySearching', false);
      this.set('isCitySelected', true);
      this.set('searchText', [city.name, city.sys.country].join(',') );
      this.set('model.selectedCity', city);
      var route = this.parentController.currentRouteName.split('.')[0].concat('.weather');
      this.transitionToRoute(route, city.id);
    }
  }
});