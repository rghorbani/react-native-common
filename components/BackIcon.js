/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

var Platform = require('Platform');

if (Platform.OS === 'ios') {
  module.exports = require('./img/back.png');
} else {
  module.exports = require('./img/back.png');
}
