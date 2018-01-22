/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

const { Dimensions, Platform, NativeModules } = require('react-native');

const { StatusBarManager } = NativeModules;
const { height, width } = Dimensions.get('window');

module.exports = {
  isAndroid: Platform.OS === 'android',
  isIOS: Platform.OS === 'ios',
  screenHeight: height,
  screenWidth: width,
  isSmallScreen: Platform.OS === 'ios' ? (width <= 320) : (width <= 360),
  isShortScreen: height <= 600,
  statusBarHeight: Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT,
};
