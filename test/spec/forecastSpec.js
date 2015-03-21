'use strict';
describe('Weather App Search:', function() {
    var weatherCityController;

    beforeAll(function() {
        // controller
        weatherCityController = App.WeatherCityController.create();

    });

    it('On Show forecast', function() {
        // given
        expect(weatherCityController).not.toBeNull();
        var cityName = 'london',
            wCityData = {
                coord: {
                    lat: 51.51,
                    lon: -0.13
                }
            };
        spyOn(weatherCityController, 'transitionToRoute');
        spyOn(AppAjaxService, 'doGetCall').and.callFake(function(url, successCallback) {
            console.log('Mock ajax resonse for forecast weather=' + url);
            successCallback(CityMockData[cityName].forecast);
        });

        // when show forecast
        weatherCityController.send('showUpdateCharts', wCityData);

        // then
        expect(weatherCityController.get('hasCharts')).toBe(true);
        expect(weatherCityController.get('model.weatherCharts').length).toBe(3);
    });
});
