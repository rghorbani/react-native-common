/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @providesModule RGFTouchable
 * @flow
 */

'use strict';

import React from 'react';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

function RGFTouchableIOS(props: Object): ReactElement {
  return (
    <TouchableHighlight
      accessibilityTraits="button"
      underlayColor="#3C5EAE"
      {...props}
    />
  );
}

const RGFTouchable = Platform.OS === 'android'
  ? TouchableNativeFeedback
  : RGFTouchableIOS;

module.exports = RGFTouchable;
