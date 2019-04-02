/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} = require('react-native');

function RNCTouchableIOS(props: Object): ReactElement {
  return (
    <TouchableHighlight
      accessibilityTraits="button"
      underlayColor="#3C5EAE"
      {...props}
    />
  );
}

const RNCTouchable =
  Platform.OS === 'android' ? TouchableNativeFeedback : RNCTouchableIOS;

module.exports = RNCTouchable;
