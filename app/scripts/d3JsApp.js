'use strict';

App.D3Route = Ember.Route.extend({

});

App.D3WeatherRoute = Ember.Route.extend({
  model: function() {
    return { 
      'temparatureData': {}, 
      'precipitationData': {},
      'windData': {},
      'pressureData': {}
    };
  }
});