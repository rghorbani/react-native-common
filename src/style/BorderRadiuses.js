/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const _ = require('lodash');

const { Constants } = require('../helpers');

class BorderRadiuses {
  br0 = 0;
  br10 = Constants.isIOS ? 3 : 2;
  br20 = 6;
  br30 = Constants.isIOS ? 9 : 8;
  br40 = 12;
  br50 = Constants.isIOS ? 15 : 16;
  br60 = 20;
  br100 = 999;

  loadBorders(borders) {
    _.forEach(borders, (value, key) => {
      this[key] = value;
    });
  }

  getKeysPattern() {
    return new RegExp(
      _.chain(this)
        .keys()
        .map(key => [`${key}`])
        .flatten()
        .join('|')
        .value(),
    );
  }
}

module.exports = new BorderRadiuses();
