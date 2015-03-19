'use strict';
describe('Weather App City Search:', function() {

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
});
