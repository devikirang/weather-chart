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
    options.legendTemplate = '<ul class=\"<%=name.toLowerCase()%>-legend list-inline text-right\"><% for (var i=0; i<datasets.length; i++){%><li><span class=\"label\" style=\"background-color:<%=datasets[i].strokeColor%>\"> <%if(datasets[i].label){%><%=datasets[i].label%><%}%> </span></li><%}%> <li><span class=\"label label-info\">Time in GMT</span></li> </ul>';

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
    
    if (this.get('legend')) {
      var legend = chart.generateLegend();
      this.$().parent().prepend(legend);
    }

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

// Chart Graph models.
function getTemperatureChart() {
  return { 
    type: 'Line',
    panelHeading: 'Temperature Forecast',
    panelClass: 'panel panel-danger',
    data: {
      labels: [],
      datasets: [
      {
        label: 'Max. Temperature in °F',
        fillColor: 'rgba(191, 63, 127, 0.2)',
        strokeColor: 'rgba(191, 63, 127, 1)',
        pointColor: 'rgba(191, 63, 127, 1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(191, 63, 127, 1)',
        data: []
      },
      {
        label: 'Temperature in °F',
        fillColor: 'rgba(191, 63, 63, 0.2)',
        strokeColor: 'rgba(191, 63, 63, 1)',
        pointColor: 'rgba(191, 63, 63, 1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(191, 63, 63, 1)',
        data: []
      }
      ]
    }
  };
}

function getPressureChart() {
  return { 
    type: 'Bar',
    panelHeading: 'Pressure Forecast',
    panelClass: 'panel panel-info',
    data: {
      labels: [],
      datasets: [{
        label: 'Pressure in hpa',
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
}

function getPrecipitaionChart() {
  return { 
    type: 'Line',
    panelHeading: 'Precipitaion Forecast',
    panelClass: 'panel panel-success',
    data: {
      labels: [],
      datasets: [
      {
        label: 'Rain in mm',
        fillColor: 'rgba(114, 114, 140, 0.2)',
        strokeColor: 'rgba(114, 114, 140, 1)',
        pointColor: 'rgba(114, 114, 140, 1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(114, 114, 140, 1)',
        data: []
      },
      {
        label: 'Snow in mm',
        fillColor: 'rgba(191, 191, 63, 0.2)',
        strokeColor: 'rgba(191, 191, 63, 1)',
        pointColor: 'rgba(191, 191, 63, 1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(191, 191, 63, 1)',
        data: []
      }
      ]
    },
    options: {
      scaleBeginAtZero : false
    }
  };
}

// Chartjs settings
Chart.defaults.global.responsive = true;

// MVC
App.WeatherCityController = Ember.ObjectController.extend({
  hasCharts: false,
  
  model: {
    weatherCharts: []
  },

  hasCurrentWeather: function() {
    var address = this.get('model.daddress');
    return address && address.length > 0;
  }.property('model.daddress'),  

  noChartsPresent: function() {
    var charts = this.get('model.weatherCharts');
    return !charts || charts.length === 0;
  }.property('model.weatherCharts'),

  actions: {
    showUpdateCharts: function(wCityData) {
      var temperatureChart = getTemperatureChart();
      var precipitaionChart = getPrecipitaionChart();
      var pressureChart = getPressureChart();
      
      var self = this;
      var previousWeekDay = '';
      AppAjaxService.doGetCall(URLs.forecast(wCityData.coord.lat, wCityData.coord.lon), 
        function(forecastData) {
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

          temperatureChart.data.labels = labels;
          temperatureChart.data.datasets[0].data = _.map(_.map(forecastData.list, 'main'), 'temp_max');
          temperatureChart.data.datasets[1].data = _.map(_.map(forecastData.list, 'main'), 'temp');

          if (_.xor(temperatureChart.data.datasets[0].data, temperatureChart.data.datasets[1].data).length === 0) {
            _.pullAt(temperatureChart.data.datasets, 0);
          }


          pressureChart.data.labels = labels;
          pressureChart.data.datasets[0].data = _.map(_.map(forecastData.list, 'main'), 'pressure');

          precipitaionChart.data.labels = labels;
          precipitaionChart.data.datasets[0].data = _.map(_.map(_.map(forecastData.list, 'rain'), '3h'), function(num) {
            return (num ? num : 0);
          });
          precipitaionChart.data.datasets[1].data = _.map(_.map(_.map(forecastData.list, 'snow'), '3h'), function(num) {
            return (num ? num : 0);
          });
          // Remove if no data to show.
          _.remove(precipitaionChart.data.datasets, function(dataset) {
            var noData = _.filter(dataset.data, function(n) {
              return n !== 0;
            }).length === 0;
            return noData;
          });

          var charts = [];
          charts.push(temperatureChart);
          if (precipitaionChart.data.datasets.length > 0) {
            charts.push(precipitaionChart);  
          }
          charts.push(pressureChart);
          self.set('hasCharts', charts.length > 0);
          self.set('model.weatherCharts', charts);
        }); 
}
}
});
