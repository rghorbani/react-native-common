/**
 * Copyright 2016 Reza (github.com/rghorbani).
 *
 * @flow
 */

'use strict';

const { Dimensions, Platform, NativeModules } = require('react-native');

const { StatusBarManager } = NativeModules;
const { height, width } = Dimensions.get('window');
let statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

module.exports = {
  isAndroid: Platform.OS === 'android',
  isIOS: Platform.OS === 'ios',
  screenHeight: height,
  screenWidth: width,
  isSmallScreen: Platform.OS === 'ios' ? width <= 320 : width <= 360,
  isShortScreen: height <= 600,
  statusBarHeight: statusBarHeight,
  isIphoneX: Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (height === 812 || width === 812),
};

if (Platform.OS === 'ios') {
  StatusBarManager.getHeight(data => (statusBarHeight = data.height));
}
