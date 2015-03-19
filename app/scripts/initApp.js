'use strict';
var OPEN_WEATHER_API_KEY = '1111111111'; // Update with your own key
// Ember App.
var App = Ember.Application.create();

// Ajax Service
// register AJAX prefilter : options, original options
$.ajaxPrefilter(function(options, originalOptions) {

  // retry not set or less than 2 : retry not requested
  if (!originalOptions.retryMax || originalOptions.retryMax < 2) {
    return;
  }
  // no timeout was setup
  if (originalOptions.timeout === 0) {
    return;
  }

  if (originalOptions.retryCount) {
    originalOptions.retryCount++;
  } else {
    originalOptions.retryCount = 1;
    originalOptions._error = originalOptions.error;
  }

  options.error = function(_jqXHR, _textStatus, _errorThrown) {
    if (originalOptions.retryCount >= originalOptions.retryMax) {
      if (originalOptions._error) {
        originalOptions._error(_jqXHR, _textStatus, _errorThrown);
      }
      return;
    }
    // Call AJAX again with original options
    console.log('Ajax try again.');
    $.ajax(originalOptions);
  };
});

/* jshint unused: false */
var AppAjaxService = {
  doGetCall: function(url, successCallback) {
    console.log('Get call url='+ url);
    $('#loading').show();
    $.ajax({
      url: url,
      dataType: 'jsonp',
      retryMax: 5,
      timeout: 20000,
      success: function(data) {
        successCallback(data);
        $('#loading').hide();
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log('xhr:' + xhr + ' error:' + textStatus + ' errorThrown:' + errorThrown);
        $('#loading').hide();
      }
    });
  }
};

//OpenWeather url mapping
App.OpenWeatherUrlObject = Ember.Object.extend({
  host: 'http://openweathermap.org',
  hostApi: 'http://api.openweathermap.org/data/2.5',
  units: 'imperial',

  queryData: function(data) {
    var ret = [];
    for (var d in data) {
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    }
    return ret.join('&');
  },

  commonParams: function() {
    return {
      'units': this.get('units'),
      'APPID': OPEN_WEATHER_API_KEY
    };
  },

  search: function(searchText) {
    var data = this.commonParams();
    data.q = searchText;
    return this.get('hostApi') + '/find?' + this.queryData(data);
  },

  cityId: function(id) {
    var data = this.commonParams();
    data.id = id;
    return this.get('hostApi') + '/weather?' + this.queryData(data);
  },

  geoLocation: function(lat, lon) {
    var data = this.commonParams();
    data.lat = lat;
    data.lon = lon;
    return this.get('hostApi') + '/weather?' + this.queryData(data);
  },

  forecast: function(lat, lon) {
    var data = this.commonParams();
    data.lat = lat;
    data.lon = lon;
    return this.get('hostApi') + '/forecast?' + this.queryData(data);
  },
  map: function(lat, lon) {
    var data = {
      'lat': lat,
      'lon': lon,
      'zoom': 12,
      'layers': 'B0FTTFF'
    };
    return this.get('host') + '/Maps?' + this.queryData(data);
  }
});

var URLs = App.OpenWeatherUrlObject.create();

Ember.Handlebars.helper('weather-img', function(icon) {
  var escaped = Handlebars.Utils.escapeExpression(icon);
  return new Ember.Handlebars.SafeString('<img src="' + URLs.get('host') + '/img/w/' + escaped + '.png" class="img-thumbnail weather-icon">');
});

Ember.Handlebars.helper('weather-map', function(city) {
  var hrefUrl = 'http://www.msn.com/en-us/weather/fullscreenmaps/' + _.words(city.daddress)[0] + '/we-city-' + city.lat + ',' + city.lon + '?maptype=temperature';
  return new Ember.Handlebars.SafeString('<a class="btn btn-info top-buffer" target="_blank" href="' + hrefUrl + '"><span class="glyphicon glyphicon-new-window"></span> Map View</a>');
});
