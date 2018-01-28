

const commons = require('./commons');
const components = require('./components');
const helpers = require('./helpers');
const screenComponents = require('./screen-components');
const style = require('./style');

module.exports = {
  ...commons,
  ...components,
  ...helpers,
  ...screenComponents,
  ...style,
};
