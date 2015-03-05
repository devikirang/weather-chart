'use strict';
// Mock Model
var data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
  {
    label: 'My First dataset',
    type: 'line',
    fillColor: 'rgba(220,220,220,0.2)',
    strokeColor: 'rgba(220,220,220,1)',
    pointColor: 'rgba(220,220,220,1)',
    pointStrokeColor: '#fff',
    pointHighlightFill: '#fff',
    pointHighlightStroke: 'rgba(220,220,220,1)',
    data: [65, 59, 80, 81, 56, 55, 40]
  },
  {
    label: 'My Second dataset',
    type: 'bar',
    fillColor: 'rgba(151,187,205,0.2)',
    strokeColor: 'rgba(151,187,205,1)',
    pointColor: 'rgba(151,187,205,1)',
    pointStrokeColor: '#fff',
    pointHighlightFill: '#fff',
    pointHighlightStroke: 'rgba(151,187,205,1)',
    data: [28, 48, 40, 19, 86, 27, 90]
  }
  ]
};

App.ChartjsRoute = Ember.Route.extend({
  model: function() {
    return { 
      'temparatureData': data, 
      'precipitationData': data,
      'windData': data,
      'pressureData': data
    };
  }
});

App.ChartjsController = Ember.ObjectController.extend({
  actions: {
    searchCity: function() {
      console.log('search City');
    }
  }
});