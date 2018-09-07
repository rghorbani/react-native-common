/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 * @providesModule RNCommon
 */

const RNUILib = require('react-native-ui-lib');
const components = require('./components');

module.exports = {
  ...RNUILib,
  ...components,
};
