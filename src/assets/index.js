/**
 * Copyright 2016 Reza (github.com/rghorbani).
 *
 * @flow
 */

'use strict';

const _ = require('lodash');

const emojis = require('./emojis');
const icons = require('./icons');

class Assets {
  emojis = emojis;
  icons = icons;

  loadAssetsGroup(groupName, assets) {
    if (!_.isString(groupName)) {
      throw new Error('group name should be a string');
    }

    if (!_.isPlainObject(assets)) {
      throw new Error('assets should be a hash map');
    }

    _.forEach(assets, (value, key) => {
      _.set(this, `${groupName}.${key}`, value);
    });
  }
}

module.exports = new Assets();
