/**
 * Copyright 2017 Reza (github.com/rghorbani)
 *
 * @flow
 */

const BackIcon = require('./BackIcon');
const BackWhiteIcon = require('./BackWhiteIcon');
const ForwardIcon = require('./ForwardIcon');
const ForwardWhiteIcon = require('./ForwardWhiteIcon');
const XIcon = require('./XIcon');
const XWhiteIcon = require('./XWhiteIcon');

module.exports = {
  get BackIcon() { return require('./BackIcon')},
  get BackWhiteIcon() { return require('./BackWhiteIcon')},
  get ForwardIcon() { return require('./ForwardIcon')},
  get ForwardWhiteIcon() { return require('./ForwardWhiteIcon')},
  get XIcon() { return require('./XIcon')},
  get XWhiteIcon() { return require('./XWhiteIcon')},
};
