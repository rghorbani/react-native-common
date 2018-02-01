/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const { Platform } = require('react-native');

if (Platform.OS === 'ios') {
  module.exports = {
    br0: 0,
    br10: 3,
    br20: 6,
    br30: 9,
    br40: 12,
    br50: 15,
    br60: 20,
    br100: 999,
  };
} else if (Platform.OS === 'android') {
  module.exports = {
    br0: 0,
    br10: 2,
    br20: 6,
    br30: 8,
    br40: 12,
    br50: 16,
    br60: 20,
    br100: 999,
  };
} else {
  throw 'BorderRadiuses: Unknown platform';
}
