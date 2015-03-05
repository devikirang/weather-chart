'use strict';

App.D3Controller = Ember.ObjectController.extend({
  actions: {
    searchCity: function() {
      console.log('search City');
    },
    selectCity: function() {
      console.log('select City');
    }
  }
});
