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
  actions: {
    searchCity: function() {
      var self = this;
      $.getJSON(URLs.get('search') + this.get('searchText')).done(function(data) {
          self.set('model', data);
          self.set('model.hasResults', data.count);
          if(data.count === 1) {
             self.send('selectCity', data.list[0].id);
          }
      });
    },
    selectCity: function(cityId) {
      var route = this.parentController.currentRouteName.split('.')[0].concat('.weather');
      this.transitionToRoute(route, cityId);
    }
  }
});