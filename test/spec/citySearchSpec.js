'use strict';
describe('Weather App City Search:', function() {

  var searchController;

  beforeAll(function() {
    // controller
    searchController = App.WeatherController.create();

  });

  beforeEach(function() {
    console.log('Running Test =' + jasmine.getEnv().currentSpec.description);
  });

  afterEach(function() {
    console.log('Completed Test =' + jasmine.getEnv().currentSpec.description);
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

  it('City Search should have Geo address, lat & lon infromation', function() {
    // given
    expect(searchController).not.toBeNull();

    // when search city with empty string.
    searchController.set('searchText', 'Washington');
    searchController.send('searchCity');

    // then
    var searchResults = searchController.get('model.geoResults');
    _.each(searchResults, function(searchResult) {
      expect(searchResult.daddress).toBeDefined();
      expect(searchResult.faddress).toBeDefined();
      expect(searchResult.lat).toBeDefined();
      expect(searchResult.lon).toBeDefined();
    });

  });
});
