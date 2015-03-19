'use strict';
describe('City Weather Data:', function() {

  var searchController;

  beforeAll(function() {
    // controller
    searchController = App.WeatherController.create();

  });

  it('On Select City, Call api for current weather', function() {
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


  it('On Select City, have the weather data', function() {
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
      console.log('Mock ajax resonse for current weather=' + url);
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
});
