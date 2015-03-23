'use strict';
describe('City Weather Forecast Suite', function() {
  var weatherCityController,
    cityName = 'london',
    wCityData = {
      coord: {
        lat: 51.51,
        lon: -0.13
      }
    };

  beforeAll(function() {
    // controller
    weatherCityController = App.WeatherCityController.create();
    weatherCityController.set('model.daddress', 'London UX');

  });

  beforeEach(function() {
    // given
    expect(weatherCityController).not.toBeNull();
    spyOn(weatherCityController, 'transitionToRoute');
    spyOn(AppAjaxService, 'doGetCall').and.callFake(function(url, successCallback) {
      console.log('Mock ajax resonse for forecast weather=' + url);
      successCallback(CityMockData[cityName].forecast);
    });
  });

  it('Should have charts present on show/refresh forecast', function() {

    // when show forecast
    weatherCityController.send('showUpdateCharts', wCityData);

    // then
    expect(weatherCityController.get('hasCurrentWeather')).toBe(true);
    expect(weatherCityController.get('hasCharts')).toBe(true);
    expect(weatherCityController.get('noChartsPresent')).toBe(false);
  });

  it('Should show all 3 charts on show/refresh forecast', function() {

    // when show forecast
    weatherCityController.send('showUpdateCharts', wCityData);

    // then
    expect(weatherCityController.get('model.weatherCharts').length).toBe(3);
  });

  it('Check chart 2: Temparature Chart', function() {
    // when show forecast
    weatherCityController.send('showUpdateCharts', wCityData);
    // then
    expect(weatherCityController.get('model.weatherCharts').length).toBe(3);

    var chartData = weatherCityController.get('model.weatherCharts')[0];
    var chart = App.EmberChartComponent.create({
      type: chartData.type,
      data: chartData.data,
      options: chartData.options,
      update: true,
      legend: true
    });

    // when
    Ember.run(function() {
      Ember.$('<div id="temperatureChart"/>').appendTo(App.rootElement);
      chart.appendTo('#temperatureChart');
    });
    // then
    expect( chart.$().parent().text() ).toMatch('Temperature in °F');
  });


  it('Check chart 2: Precipitaion Chart', function() {
    // when show forecast
    weatherCityController.send('showUpdateCharts', wCityData);
    // then
    expect(weatherCityController.get('model.weatherCharts').length).toBe(3);

    var chartData = weatherCityController.get('model.weatherCharts')[1];
    var chart = App.EmberChartComponent.create({
      type: chartData.type,
      data: chartData.data,
      options: chartData.options,
      update: true,
      legend: true
    });

    // when
    Ember.run(function() {
      Ember.$('<div id="precipitaionChart"/>').appendTo(App.rootElement);
      chart.appendTo('#precipitaionChart');
    });
    // then
    expect( chart.$().parent().text() ).toMatch('Rain in mm');
  });

  it('Check chart 3: Pressure Chart', function() {
    // when show forecast
    weatherCityController.send('showUpdateCharts', wCityData);
    // then
    expect(weatherCityController.get('model.weatherCharts').length).toBe(3);

    var chartData = weatherCityController.get('model.weatherCharts')[2];
    var chart = App.EmberChartComponent.create({
      type: chartData.type,
      data: chartData.data,
      options: chartData.options,
      update: true,
      legend: true
    });

    // when
    Ember.run(function() {
      Ember.$('<div id="pressureChart"/>').appendTo(App.rootElement);
      chart.appendTo('#pressureChart');
    });
    // then
    expect( chart.$().parent().text() ).toMatch('Pressure in hpa');
  });

  afterAll(function() {
    App.reset();
  });

});
