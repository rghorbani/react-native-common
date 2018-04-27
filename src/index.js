/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 * @providesModule RNCommon
 */

const commons = require('./commons');
const components = require('./components');
const helpers = require('./helpers');
const nativeComponents = require('./native-components');
const screenComponents = require('./screen-components');
const style = require('./style');

module.exports = {
  get Assets() { return require('./assets'); },
  ...commons,
  ...components,
  ...helpers,
  ...nativeComponents,
  ...screenComponents,
  ...style,
};
