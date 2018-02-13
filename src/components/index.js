/**
 * Copyright 2016 Reza (github.com/rghorbani).
 *
 * @flow
 */

'use strict';

const Containers = require('./containers');
const Images = require('./images');
const Inputs = require('./inputs');
const KeyboardAware = require('./keyboard-aware');
const NavIcons = require('./nav-icons');
const Touchables = require('./touchables');

module.exports = {
  ...Containers,
  ...Images,
  ...Inputs,
  ...KeyboardAware,
  ...NavIcons,
  ...Touchables,
  get Badge() { return require('./badge'); },
  get Button() { return require('./button'); },
  get Header() { return require('./header'); },
  get KeyboardSpacer() { return require('./KeyboardSpacer'); },
  get LoadingView() { return require('./loading'); },
  get Text() { return require('./text'); },
  get View() { return require('./view'); },
  // Other
  get Navigator() { return require('./Navigator/Navigator'); },
  // Old
  get Carousel() { return require('./Carousel'); },
  get DrawerLayout() { return require('./DrawerLayout'); },
  get InfiniteScrollView() { return require('./InfiniteScrollView'); },
  get ItemsWithSeperator() { return require('./ItemsWithSeperator'); },
  // get ListContainer() { return require('./ListContainer'); },
  get PageControl() { return require('./PageControl'); },
  get Popover() { return require('./Popover'); },
  get ProgressBar() { return require('./ProgressBar'); },
  get PureListView() { return require('./PureListView'); },
  get SegmentedControl() { return require('./SegmentedControl'); },
  get SettingsList() { return require('./SettingsList'); },
  get StyleSheet() { return require('./StyleSheet'); },
  get ViewPager() { return require('./ViewPager'); },
};
