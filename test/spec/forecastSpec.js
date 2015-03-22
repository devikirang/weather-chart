'use strict';
describe('City Weather Forecast Tests:', function() {
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
});
