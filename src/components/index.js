/**
 * Copyright 2016 Reza (github.com/rghorbani).
 *
 * @flow
 */

'use strict';

const { BaseComponent } = require('../commons');

const Inputs = require('./inputs');
const KeyboardAware = require('./keyboard-aware');
const NavIcons = require('./nav-icons');
const Touchables = require('./touchables');

module.exports = {
  // Base
  ...BaseComponent,
  // Components
  ...Inputs,
  ...KeyboardAware,
  ...NavIcons,
  ...Touchables,
  get Badge() { return require('./badge')},
  get Button() { return require('./button')},
  get Header() { return require('./header')},
  get Text() { return require('./text')},
  get View() { return require('./view')},
  // Old
  get Carousel() { return require('./Carousel')},
  get Colors() { return require('./Colors')},
  get DrawerLayout() { return require('./DrawerLayout')},
  get InfiniteScrollView() { return require('./InfiniteScrollView')},
  get ItemsWithSeperator() { return require('./ItemsWithSeperator')},
  get KeyboardSpacer() { return require('./KeyboardSpacer')},
  // get ListContainer() { return require('./ListContainer')},
  get LoadingView() { return require('./LoadingView')},
  get Navigator() { return require('./Navigator/Navigator')},
  // get PageContainer() { return require('./PageContainer')},
  get PageControl() { return require('./PageControl')},
  get Popover() { return require('./Popover')},
  get ProgressBar() { return require('./ProgressBar')},
  get PureListView() { return require('./PureListView')},
  get SegmentedControl() { return require('./SegmentedControl')},
  get SettingsList() { return require('./SettingsList')},
  get StyleSheet() { return require('./StyleSheet')},
  get ViewPager() { return require('./ViewPager')},
};
