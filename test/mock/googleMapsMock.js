'use strict';
var geoMockData = {
  'london': {
    'results': [{
      'address_components': [{
        'long_name': 'London',
        'short_name': 'London',
        'types': ['locality', 'political']
      }, {
        'long_name': 'United Kingdom',
        'short_name': 'GB',
        'types': ['country', 'political']
      }],
      'formatted_address': 'London, UK',
      'geometry': {
        'bounds': {
          'northeast': {
            'lat': 51.6723432,
            'lng': 0.148271
          },
          'southwest': {
            'lat': 51.38494009999999,
            'lng': -0.3514683
          }
        },
        'location': {
          'lat': function() {
            return 51.5073509;
          },
          'lng': function() {
            return -0.1277583;
          }
        },
        'location_type': 'APPROXIMATE',
        'viewport': {
          'northeast': {
            'lat': 51.6723432,
            'lng': 0.148271
          },
          'southwest': {
            'lat': 51.38494009999999,
            'lng': -0.3514683
          }
        }
      },
      'place_id': 'ChIJdd4hrwug2EcRmSrV3Vo6llI',
      'types': ['locality', 'political']
    }, {
      'address_components': [{
        'long_name': 'London',
        'short_name': 'London',
        'types': ['locality', 'political']
      }, {
        'long_name': 'Middlesex County',
        'short_name': 'Middlesex County',
        'types': ['administrative_area_level_2', 'political']
      }, {
        'long_name': 'Ontario',
        'short_name': 'ON',
        'types': ['administrative_area_level_1', 'political']
      }, {
        'long_name': 'Canada',
        'short_name': 'CA',
        'types': ['country', 'political']
      }],
      'formatted_address': 'London, ON, Canada',
      'geometry': {
        'bounds': {
          'northeast': {
            'lat': 43.073245,
            'lng': -81.1063879
          },
          'southwest': {
            'lat': 42.824517,
            'lng': -81.390852
          }
        },
        'location': {
          'lat': function() {
            return 42.9869502;
          },
          'lng': function() {
            return -81.243177;
          }
        },
        'location_type': 'APPROXIMATE',
        'viewport': {
          'northeast': {
            'lat': 43.073245,
            'lng': -81.1063879
          },
          'southwest': {
            'lat': 42.824517,
            'lng': -81.390852
          }
        }
      },
      'place_id': 'ChIJC5uNqA7yLogRlWsFmmnXxyg',
      'types': ['locality', 'political']
    }, {
      'address_components': [{
        'long_name': 'London',
        'short_name': 'London',
        'types': ['locality', 'political']
      }, {
        'long_name': 'Laurel County',
        'short_name': 'Laurel County',
        'types': ['administrative_area_level_2', 'political']
      }, {
        'long_name': 'Kentucky',
        'short_name': 'KY',
        'types': ['administrative_area_level_1', 'political']
      }, {
        'long_name': 'United States',
        'short_name': 'US',
        'types': ['country', 'political']
      }],
      'formatted_address': 'London, KY, USA',
      'geometry': {
        'bounds': {
          'northeast': {
            'lat': 37.1522599,
            'lng': -84.03595709999999
          },
          'southwest': {
            'lat': 37.0797589,
            'lng': -84.126262
          }
        },
        'location': {
          'lat': function() {
            return 37.1289771;
          },
          'lng': function() {
            return -84.08326459999999;
          }
        },
        'location_type': 'APPROXIMATE',
        'viewport': {
          'northeast': {
            'lat': 37.1522599,
            'lng': -84.03595709999999
          },
          'southwest': {
            'lat': 37.0797589,
            'lng': -84.126262
          }
        }
      },
      'place_id': 'ChIJA8c2lxTNXIgRmMwHc-RRGWI',
      'types': ['locality', 'political']
    }, {
      'address_components': [{
        'long_name': 'London',
        'short_name': 'London',
        'types': ['locality', 'political']
      }, {
        'long_name': 'Madison County',
        'short_name': 'Madison County',
        'types': ['administrative_area_level_2', 'political']
      }, {
        'long_name': 'Ohio',
        'short_name': 'OH',
        'types': ['administrative_area_level_1', 'political']
      }, {
        'long_name': 'United States',
        'short_name': 'US',
        'types': ['country', 'political']
      }, {
        'long_name': '43140',
        'short_name': '43140',
        'types': ['postal_code']
      }],
      'formatted_address': 'London, OH 43140, USA',
      'geometry': {
        'bounds': {
          'northeast': {
            'lat': 39.921786,
            'lng': -83.3899969
          },
          'southwest': {
            'lat': 39.85928,
            'lng': -83.47892299999999
          }
        },
        'location': {
          'lat': function() {
            return 39.8864493;
          },
          'lng': function() {
            return -83.4482529;
          }
        },
        'location_type': 'APPROXIMATE',
        'viewport': {
          'northeast': {
            'lat': 39.921786,
            'lng': -83.3899969
          },
          'southwest': {
            'lat': 39.85928,
            'lng': -83.47892299999999
          }
        }
      },
      'place_id': 'ChIJPxME6JelOIgROH-JN5Bcr9Y',
      'types': ['locality', 'political']
    }],
    'status': 'OK'
  },

  'washington': {
    'results': [{
      'address_components': [{
        'long_name': 'Washington',
        'short_name': 'D.C.',
        'types': ['locality', 'political']
      }, {
        'long_name': 'District of Columbia',
        'short_name': 'District of Columbia',
        'types': ['administrative_area_level_2', 'political']
      }, {
        'long_name': 'District of Columbia',
        'short_name': 'DC',
        'types': ['administrative_area_level_1', 'political']
      }, {
        'long_name': 'United States',
        'short_name': 'US',
        'types': ['country', 'political']
      }],
      'formatted_address': 'Washington, DC, USA',
      'geometry': {
        'bounds': {
          'northeast': {
            'lat': 38.995548,
            'lng': -76.90939299999999
          },
          'southwest': {
            'lat': 38.8031494,
            'lng': -77.1197401
          }
        },
        'location': {
          'lat': function() {
            return 38.9071923;
          },
          'lng': function() {
            return -77.03687069999999;
          }
        },
        'location_type': 'APPROXIMATE',
        'viewport': {
          'northeast': {
            'lat': 38.995548,
            'lng': -76.90939299999999
          },
          'southwest': {
            'lat': 38.8031494,
            'lng': -77.1197401
          }
        }
      },
      'place_id': 'ChIJW-T2Wt7Gt4kRKl2I1CJFUsI',
      'types': ['locality', 'political']
    }, {
      'address_components': [{
        'long_name': 'Washington',
        'short_name': 'Washington',
        'types': ['locality', 'political']
      }, {
        'long_name': 'Hampton',
        'short_name': 'Hampton',
        'types': ['administrative_area_level_3', 'political']
      }, {
        'long_name': 'Rappahannock County',
        'short_name': 'Rappahannock County',
        'types': ['administrative_area_level_2', 'political']
      }, {
        'long_name': 'Virginia',
        'short_name': 'VA',
        'types': ['administrative_area_level_1', 'political']
      }, {
        'long_name': 'United States',
        'short_name': 'US',
        'types': ['country', 'political']
      }, {
        'long_name': '22747',
        'short_name': '22747',
        'types': ['postal_code']
      }],
      'formatted_address': 'Washington, VA 22747, USA',
      'geometry': {
        'bounds': {
          'northeast': {
            'lat': 38.717447,
            'lng': -78.1546579
          },
          'southwest': {
            'lat': 38.7077278,
            'lng': -78.16559889999999
          }
        },
        'location': {
          'lat': function() {
            return 38.7134519;
          },
          'lng': function() {
            return -78.1594439;
          }
        },
        'location_type': 'APPROXIMATE',
        'viewport': {
          'northeast': {
            'lat': 38.717447,
            'lng': -78.1546579
          },
          'southwest': {
            'lat': 38.7077278,
            'lng': -78.16559889999999
          }
        }
      },
      'place_id': 'ChIJgcQcZykztIkRdZRJgYO-NM4',
      'types': ['locality', 'political']
    }, {
      'address_components': [{
        'long_name': 'Washington',
        'short_name': 'Washington',
        'types': ['locality', 'political']
      }, {
        'long_name': 'Washington County',
        'short_name': 'Washington County',
        'types': ['administrative_area_level_2', 'political']
      }, {
        'long_name': 'Utah',
        'short_name': 'UT',
        'types': ['administrative_area_level_1', 'political']
      }, {
        'long_name': 'United States',
        'short_name': 'US',
        'types': ['country', 'political']
      }],
      'formatted_address': 'Washington, UT, USA',
      'geometry': {
        'bounds': {
          'northeast': {
            'lat': 37.1912612,
            'lng': -113.4216337
          },
          'southwest': {
            'lat': 37.0449575,
            'lng': -113.5366738
          }
        },
        'location': {
          'lat': function() {
            return 37.1305373;
          },
          'lng': function() {
            return -113.5082867;
          }
        },
        'location_type': 'APPROXIMATE',
        'viewport': {
          'northeast': {
            'lat': 37.1912612,
            'lng': -113.4216337
          },
          'southwest': {
            'lat': 37.0449575,
            'lng': -113.5366738
          }
        }
      },
      'place_id': 'ChIJM8ibgoBZyoARipTj-GvKL3M',
      'types': ['locality', 'political']
    }, {
      'address_components': [{
        'long_name': 'Washington',
        'short_name': 'Washington',
        'types': ['locality', 'political']
      }, {
        'long_name': 'Washington',
        'short_name': 'Washington',
        'types': ['administrative_area_level_3', 'political']
      }, {
        'long_name': 'Washington County',
        'short_name': 'Washington County',
        'types': ['administrative_area_level_2', 'political']
      }, {
        'long_name': 'Iowa',
        'short_name': 'IA',
        'types': ['administrative_area_level_1', 'political']
      }, {
        'long_name': 'United States',
        'short_name': 'US',
        'types': ['country', 'political']
      }, {
        'long_name': '52353',
        'short_name': '52353',
        'types': ['postal_code']
      }],
      'formatted_address': 'Washington, IA 52353, USA',
      'geometry': {
        'bounds': {
          'northeast': {
            'lat': 41.3163429,
            'lng': -91.66413799999999
          },
          'southwest': {
            'lat': 41.279653,
            'lng': -91.7225869
          }
        },
        'location': {
          'lat': function() {
            return 41.30140770000001;
          },
          'lng': function() {
            return -91.69164169999999;
          }
        },
        'location_type': 'APPROXIMATE',
        'viewport': {
          'northeast': {
            'lat': 41.3163429,
            'lng': -91.66413799999999
          },
          'southwest': {
            'lat': 41.279653,
            'lng': -91.7225869
          }
        }
      },
      'place_id': 'ChIJGeFayWco5IcR6l_c2SoPa_0',
      'types': ['locality', 'political']
    }, {
      'address_components': [{
        'long_name': 'Washington',
        'short_name': 'Washington',
        'types': ['locality', 'political']
      }, {
        'long_name': 'Wilkes County',
        'short_name': 'Wilkes County',
        'types': ['administrative_area_level_2', 'political']
      }, {
        'long_name': 'Georgia',
        'short_name': 'GA',
        'types': ['administrative_area_level_1', 'political']
      }, {
        'long_name': 'United States',
        'short_name': 'US',
        'types': ['country', 'political']
      }, {
        'long_name': '30673',
        'short_name': '30673',
        'types': ['postal_code']
      }],
      'formatted_address': 'Washington, GA 30673, USA',
      'geometry': {
        'bounds': {
          'northeast': {
            'lat': 33.7568209,
            'lng': -82.7132029
          },
          'southwest': {
            'lat': 33.705673,
            'lng': -82.783627
          }
        },
        'location': {
          'lat': function() {
            return 33.7367948;
          },
          'lng': function() {
            return -82.7393089;
          }
        },
        'location_type': 'APPROXIMATE',
        'viewport': {
          'northeast': {
            'lat': 33.7568209,
            'lng': -82.7132029
          },
          'southwest': {
            'lat': 33.705673,
            'lng': -82.783627
          }
        }
      },
      'place_id': 'ChIJ81BBKaql94gR3lSoBi3ngMM',
      'types': ['locality', 'political']
    }, {
      'address_components': [{
        'long_name': 'Washington',
        'short_name': 'Washington',
        'types': ['locality', 'political']
      }, {
        'long_name': 'Lubeck',
        'short_name': 'Lubeck',
        'types': ['administrative_area_level_3', 'political']
      }, {
        'long_name': 'Wood County',
        'short_name': 'Wood County',
        'types': ['administrative_area_level_2', 'political']
      }, {
        'long_name': 'West Virginia',
        'short_name': 'WV',
        'types': ['administrative_area_level_1', 'political']
      }, {
        'long_name': 'United States',
        'short_name': 'US',
        'types': ['country', 'political']
      }],
      'formatted_address': 'Washington, WV, USA',
      'geometry': {
        'bounds': {
          'northeast': {
            'lat': 39.2625859,
            'lng': -81.644955
          },
          'southwest': {
            'lat': 39.22258009999999,
            'lng': -81.69162799999999
          }
        },
        'location': {
          'lat': function() {
            return 39.238056;
          },
          'lng': function() {
            return -81.67055599999999;
          }
        },
        'location_type': 'APPROXIMATE',
        'viewport': {
          'northeast': {
            'lat': 39.2625859,
            'lng': -81.644955
          },
          'southwest': {
            'lat': 39.22258009999999,
            'lng': -81.69162799999999
          }
        }
      },
      'place_id': 'ChIJmVYtjW1PSIgR0MWRd5Rd9wM',
      'types': ['locality', 'political']
    }],
    'status': 'OK'
  }
};

var google = {
  maps: {
    GeocoderStatus: {
      OK: 'OK'
    },
    Geocoder: function() {
      return {
        geocode: function(geocodeRequest, successCallback) {
          console.debug('Mock Geo Code call on address=' + geocodeRequest.address);
          var responseData;
          if (geocodeRequest.address) {
            responseData = geoMockData[geocodeRequest.address.toLowerCase()];
          }
          if (responseData) {
            successCallback(responseData.results, responseData.status);
          } else {
            successCallback({}, 'ZERO_RESULTS');
          }
        }
      };
    }
  }
};
