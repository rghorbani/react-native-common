

const assets = require('./assets');
const commons = require('./commons');
const components = require('./components');
const helpers = require('./helpers');
const screenComponents = require('./screen-components');
const style = require('./style');

module.exports = {
  ...assets,
  ...commons,
  ...components,
  ...helpers,
  ...screenComponents,
  ...style,
};
