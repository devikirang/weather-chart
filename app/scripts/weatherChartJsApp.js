App = Ember.Application.create();

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

// Define search child view
App.SearchView = Ember.View.extend({
  templateName: 'search',
  cityName: "Dallas, TX"
});

App.ChartjsRoute = Ember.Route.extend({
  model: function() {
    return { 
      "temparatureData": data, 
      "precipitationData": data,
      "windData": data,
      "pressureData": data
    };
  }
});

App.ChartjsController = Ember.ObjectController.extend({
  actions: {
    search: function() {
      console.log('Ajax Search');
    }
  }
});

App.D3Controller = Ember.ObjectController.extend({
  actions: {
    search: function() {
      console.log('D3 Search');
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
    canvas  = this.get('element');
    context = canvas.getContext('2d');

    canvas.width  = $(canvas).parent().width();
    canvas.height = $(canvas).parent().height()*2;

    data = this.get('data');
    type = this.get('type').charAt(0).toUpperCase() + this.get('type').slice(1);
    if(!type.match(/(Line|Bar|Radar|PolarArea|Pie|Doughnut)/)) type = "Line";
    options = (this.get('options') !== undefined) ? this.get('options') : {};

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
    chart = new Chart(this.get('_context'))[this.get('_type')](this.get('_data'),this.get('_options'));
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
    if(this.get('update') === true && this.get('setup') == true){
      this.chartRender();
    }
  }.observes('data', 'options'),

});

// Mock Model
var data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
  {
    label: "My First dataset",
    type: "line",
    fillColor: "rgba(220,220,220,0.2)",
    strokeColor: "rgba(220,220,220,1)",
    pointColor: "rgba(220,220,220,1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(220,220,220,1)",
    data: [65, 59, 80, 81, 56, 55, 40]
  },
  {
    label: "My Second dataset",
    type: "bar",
    fillColor: "rgba(151,187,205,0.2)",
    strokeColor: "rgba(151,187,205,1)",
    pointColor: "rgba(151,187,205,1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(151,187,205,1)",
    data: [28, 48, 40, 19, 86, 27, 90]
  }
  ]
};