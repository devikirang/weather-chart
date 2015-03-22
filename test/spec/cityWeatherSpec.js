'use strict';
describe('City Get Weather Data Tests:', function() {

  var searchController;

  beforeAll(function() {
    // controller
    searchController = App.WeatherController.create();

  });

  it('Should call the weather api on selecting a city from the search', function() {
    // given
    expect(searchController).not.toBeNull();

    // when search for city
    searchController.set('searchText', 'london');
    searchController.send('searchCity');

    // then
    expect(searchController.get('model.geoResults').length).toEqual(4);

    // when fake service call
    spyOn(AppAjaxService, 'doGetCall');
    // and select the first city.
    var geoCity = searchController.get('model.geoResults')[0];
    searchController.send('selectCity', geoCity);

    // then
    expect(AppAjaxService.doGetCall.calls.argsFor(0)[0]).toEqual('http://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=1111111111&lat=51.5073509&lon=-0.1277583');
  });


  it('Should have weather data available on selecting a city', function() {
    // given
    expect(searchController).not.toBeNull();

    // when search for city
    var cityName = 'london';
    searchController.set('searchText', cityName);
    searchController.send('searchCity');

    // then
    expect(searchController.get('model.geoResults').length).toEqual(4);

    // when mock ajax call
    spyOn(searchController, 'transitionToRoute');
    spyOn(AppAjaxService, 'doGetCall').and.callFake(function(url, successCallback) {
      console.log('Mock ajax response for current weather=' + url);
      successCallback(CityMockData[cityName].current);
    });
    // and select the first city.
    var geoCity = searchController.get('model.geoResults')[0];
    searchController.send('selectCity', geoCity);

    // then
    expect(searchController.get('isCitySearch')).toBe(false);
    expect(searchController.get('isCitySelected')).toBe(true);
    expect(geoCity.wCityData).toBeDefined();
  });

  it('Weather API city URLs verification', function() {
    var searchUrl = URLs.search('london');
    expect(searchUrl).toEqual('http://api.openweathermap.org/data/2.5/find?units=imperial&APPID=1111111111&q=london');

    var cityUrl = URLs.cityId('123546');
    expect(cityUrl).toEqual('http://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=1111111111&id=123546');
  });

  it('Weather API lan and lat URLs verification', function() {
    var lanLatUrl = URLs.geoLocation(53, -20);
    expect(lanLatUrl).toEqual('http://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=1111111111&lat=53&lon=-20');

    var forecastUrl = URLs.forecast(28.6, -20);
    expect(forecastUrl).toEqual('http://api.openweathermap.org/data/2.5/forecast?units=imperial&APPID=1111111111&lat=28.6&lon=-20');

    var mapUrl = URLs.map(43, -51.34);
    expect(mapUrl).toEqual('http://openweathermap.org/Maps?lat=43&lon=-51.34&zoom=12&layers=B0FTTFF');
  });

});
