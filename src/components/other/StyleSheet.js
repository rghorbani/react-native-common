/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const { Platform, StyleSheet } = require('react-native');

function create(styles: Object): { [name: string]: number } {
  const platformStyles = {};
  Object.keys(styles).forEach(name => {
    let { ios, android, ...style } = { ...styles[name] };
    if (ios && Platform.OS === 'ios') {
      style = { ...style, ...ios };
    }
    if (android && Platform.OS === 'android') {
      style = { ...style, ...android };
    }
    platformStyles[name] = style;
  });
  return StyleSheet.create(platformStyles);
}

export default {
  create,
};
