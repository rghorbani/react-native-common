/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 * @providesModule RNCommon
 */

const assets = require('./assets');
const calendars = require('./calendars');
const commons = require('./commons');
const components = require('./components');
const helpers = require('./helpers');
const screenComponents = require('./screen-components');
const style = require('./style');

module.exports = {
  ...assets,
  ...calendars,
  ...commons,
  ...components,
  ...helpers,
  ...screenComponents,
  ...style,
};
