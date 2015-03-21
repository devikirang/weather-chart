'use strict';
describe('Weather App City Search Tests:', function() {

  var searchController;

  beforeAll(function() {
    // controller
    searchController = App.WeatherController.create();

  });

  it('Should show no results on empty city search', function() {
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

  it('Should show all the London cities with city search "london"' , function() {
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

  it('Should show all the Washington cities with city search "Washington"', function() {
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

  it('Should show no results on Bad input city search', function() {
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

  it('Should have Geo address, lat & lon infromation on city search', function() {
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
