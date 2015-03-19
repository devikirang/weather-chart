'use strict';
describe('Weather App Search:', function() {

  var searchController;

  beforeAll(function() {
    // controller
    searchController = App.WeatherController.create();

  });

  it('Empty City Search', function() {
    // given
    expect(searchController).not.toBeNull();

    // when search city with empty string.
    searchController.set('searchText', '');
    searchController.send('searchCity');

    // then
    expect(searchController.get('isCitySearch')).toBe(true);
    expect(searchController.get('isCitySelected')).toBe(false);
    expect(searchController.get('model.geoResults')).toEqual([]);
    expect(searchController.get('model.hasResults')).toBe(false);
  });

  it('London City Search', function() {
    // given
    expect(searchController).not.toBeNull();

    // when search city with empty string.
    searchController.set('searchText', 'london');
    searchController.send('searchCity');

    // then
    expect(searchController.get('isCitySearch')).toBe(true);
    expect(searchController.get('isCitySelected')).toBe(false);
    expect(searchController.get('model.hasResults')).toBe(true);
    expect(searchController.get('model.geoResults').length).toEqual(4);
  });

  it('Washington City Search', function() {
    // given
    expect(searchController).not.toBeNull();

    // when search city with empty string.
    searchController.set('searchText', 'Washington');
    searchController.send('searchCity');

    // then
    expect(searchController.get('isCitySearch')).toBe(true);
    expect(searchController.get('isCitySelected')).toBe(false);
    expect(searchController.get('model.hasResults')).toBe(true);
    expect(searchController.get('model.geoResults').length).toEqual(6);
  });

  it('Bad input City Search', function() {
    // given
    expect(searchController).not.toBeNull();

    // when search city with empty string.
    searchController.set('searchText', '  + ');
    searchController.send('searchCity');

    // then
    expect(searchController.get('isCitySearch')).toBe(true);
    expect(searchController.get('isCitySelected')).toBe(false);
    expect(searchController.get('model.geoResults')).toEqual([]);
    expect(searchController.get('model.hasResults')).toBe(false);
  });

  it('On Select City, Get the weather information with lat & lon', function() {
    // given
    expect(searchController).not.toBeNull();

    // when search for city
    searchController.set('searchText', 'london');
    searchController.send('searchCity');

    // then
    expect(searchController.get('model.geoResults').length).toEqual(4);

    // when fake service call
    spyOn(AppAjaxService, "doGetCall");
    // and select the first city.
    var geoCity = searchController.get('model.geoResults')[0];
    searchController.send('selectCity', geoCity);

    // then
    expect(AppAjaxService.doGetCall.calls.argsFor(0)[0]).toEqual('http://api.openweathermap.org/data/2.5/weather?units=imperial&APPID=1111111111&lat=51.5073509&lon=-0.1277583');
  });


  it('On Select City', function() {
    // given
    expect(searchController).not.toBeNull();

    // when search for city
    var cityName = 'london';
    searchController.set('searchText', cityName);
    searchController.send('searchCity');

    // then
    expect(searchController.get('model.geoResults').length).toEqual(4);

    // when mock ajax call
    spyOn(searchController, "transitionToRoute");
    spyOn(AppAjaxService, "doGetCall").and.callFake(function(url, successCallback) {
      console.log('Mock ajax resonse for =' + url);
      successCallback(CityMockData[cityName]);
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
