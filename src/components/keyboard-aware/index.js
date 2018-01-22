/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

const KeyboardAwareScrollView = require('./KeyboardAwareScrollView');
const KeyboardAwareListView = require('./KeyboardAwareListView');

module.exports = {
  get KeyboardAwareScrollView() { return require('./KeyboardAwareScrollView')},
  get KeyboardAwareListView() { return require('./KeyboardAwareListView')},
};
