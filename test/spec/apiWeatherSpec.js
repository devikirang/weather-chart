'use strict';
describe('Weather API Suite', function() {

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
