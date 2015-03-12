'use strict';

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

// MVC
App.WeatherCityController = Ember.ObjectController.extend({
  isShowCharts: false,
  model: {
    weatherCharts: []
  },  
  actions: {
    showUpdateCharts: function(wCityData) {
      var temparatureChart = { 
        type: 'Line',
        panelHeading: 'Temparature Forecast',
        panelClass: 'panel panel-danger',
        data: {
          labels: [],
          datasets: [
          {
            label: 'Max Temparature',
            fillColor: 'rgba(191, 63, 127, 0.2)',
            strokeColor: 'rgba(191, 63, 127, 1)',
            pointColor: 'rgba(191, 63, 127, 1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(191, 63, 127, 1)',
            data: []
          },
          {
            label: 'Temparature',
            fillColor: 'rgba(191, 63, 63, 0.2)',
            strokeColor: 'rgba(191, 63, 63, 0.7)',
            pointColor: 'rgba(191, 63, 63, 0.7)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(191, 63, 63, 0.7)',
            data: []
          }
          ]
        }
      };

      var pressureChart = { 
        type: 'Bar',
        panelHeading: 'Pressure Forecast',
        panelClass: 'panel panel-info',
        data: {
          labels: [],
          datasets: [{
            label: 'Pressure',
            fillColor: 'rgba(151,187,205,0.2)',
            strokeColor: 'rgba(151,187,205,1)',
            pointColor: 'rgba(151,187,205,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,1)',
            data: []
          }]
        },
        options: {
          scaleBeginAtZero : false
        }
      };
      var self = this;
      var previousWeekDay = '';
      $.getJSON(URLs.forecast(wCityData.coord.lat, wCityData.coord.lon), function(forecastData) {
        var labels = _.map(_.pluck(forecastData.list, 'dt_txt'), function(dtTxt) {
          var date = moment(dtTxt, 'YYYY-MM-DD h:mm:ss'),
          currentWeekDay = date.format('ddd');
          if (previousWeekDay === currentWeekDay) {
            return date.format('ha');
          } else {
            previousWeekDay = currentWeekDay;
            return date.format('Do ddd ha');
          }
        });

        temparatureChart.data.labels = labels;
        temparatureChart.data.datasets[0].data = _.map(_.map(forecastData.list, 'main'), 'temp_max');
        temparatureChart.data.datasets[1].data = _.map(_.map(forecastData.list, 'main'), 'temp');

        pressureChart.data.labels = labels;
        pressureChart.data.datasets[0].data = _.map(_.map(forecastData.list, 'main'), 'pressure');

        var charts = [];
        charts.push(temparatureChart);
        charts.push(pressureChart);
        self.set('isShowCharts', charts.length > 0);
        self.set('model.weatherCharts', charts);
      }); 
    }
  }
});
