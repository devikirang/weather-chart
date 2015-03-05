'use strict';
// Router info
App.Router.map(function() {
  this.resource('chartjs');
  this.resource('d3');
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('chartjs');
  }
});

// Search MVC
App.SearchView = Ember.View.extend({
  templateName: 'search'
});

App.SearchController = Ember.ObjectController.extend({
  searchText: '',
  searchCityId: 0,
  actions: {
    searchCity: function() {
      console.log('search City');
      var self = this;
      $.getJSON(urls.get('search') + this.get('searchText')).done(function(data) {
          self.set('model', data);
          self.set('model.hasResults', data.count);
      });
    },
    selectCity: function() {
      console.log('select City');
    }
  }
});

// Chart component
App.EmberChartComponent = Ember.Component.extend({
  tagName: 'canvas',
  setup: false,

  /**
   * Construction handler
   * This will create the canvas and check the given
   * input values since Chart.js can react pretty odd
   * when getting wrong and/or missing values.
   */
   didInsertElement: function(){
    var canvas  = this.get('element');
    var context = canvas.getContext('2d');

    var data = this.get('data');
    var type = this.get('type').charAt(0).toUpperCase() + this.get('type').slice(1);
    if(!type.match(/(Line|Bar|Radar|PolarArea|Pie|Doughnut)/)) { type = 'Line'; }
    var options = (this.get('options') !== undefined) ? this.get('options') : {};

    this.setProperties({
      '_data': data,
      '_type': type,
      '_canvas':  canvas,
      '_context': context,
      '_options': options
    });
    this.chartRender();
  },

  /**
   * Render the chart to the canvas
   * This function is separated from the event hook to
   * allow data overwriting which more or less results
   * in updating the chart.
   */
   chartRender: function(){
    var chart = new Chart(this.get('_context'))[this.get('_type')](this.get('_data'),this.get('_options'));
    this.setProperties({
      '_chart': chart,
      'setup': true
    });
  },

  /**
   * Chart Update Handler
   * This will re-render the chart whenever its data or
   * options changes, if the 'update' property is set to true
   */
   chartUpdate: function(){
    if(this.get('update') === true && this.get('setup') === true){
      this.chartRender();
    }
  }.observes('data', 'options'),

});

// Chartjs settings
Chart.defaults.global.responsive = true;