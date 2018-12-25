/**
 * Copyright 2016 Reza (github.com/rghorbani).
 *
 * @flow
 */

'use strict';


import Navigator from './navigator/Navigator';
import {PageContainer} from './containers';
import LoadingView from './loading';
import Header from './header';
import KeyboardSpacer from './other/KeyboardSpacer';
import PageControl from './other/PageControl';
import PureListView from './other/PureListView';
import SegmentedControl from './other/SegmentedControl';
import SettingsList from './SettingsList';
import StyleSheet from './other/StyleSheet';
import {TextArea, TextField, TextInput} from './inputs';
import {Touchable} from './touchables';

export {
  // Containers
  Navigator,
  PageContainer,
  LoadingView,
  Header,

  // KeyboardAware
  KeyboardAwareBase,
  KeyboardAwareScrollView,
  KeyboardAwareListView,

  // Inputs
  TextArea,
  TextField,
  TextInput,

  // Other
  KeyboardSpacer,
  PageControl,
  PureListView,
  SegmentedControl,
  SettingsList,
  StyleSheet,
  Touchable,
};

/*
const Containers = require('./containers');
const Images = require('./images');
const Inputs = require('./inputs');
const KeyboardAware = require('./keyboard-aware');
const NavIcons = require('./nav-icons');
const RadioButtons = require('./radio-button');
const Touchables = require('./touchables');

module.exports = {
  ...Containers,
  ...Images,
  ...Inputs,
  ...KeyboardAware,
  ...NavIcons,
  ...RadioButtons,
  ...Touchables,
  get ActionSheet() { return require('./action-sheet'); },
  get Avatar() { return require('./avatar'); },
  get Badge() { return require('./badge'); },
  get Button() { return require('./button'); },
  get Carousel() { return require('./carousel'); },
  get Checkbox() { return require('./checkbox'); },
  get ConnectionStatusBar() { return require('./connection'); },
  get Dialog() { return require('./dialog'); },
  get Header() { return require('./header'); },
  get KeyboardSpacer() { return require('./KeyboardSpacer'); },
  get LoadingView() { return require('./loading'); },
  get Picker() { return require('./picker'); },
  get PureListView() { return require('./PureListView'); },
  get Stepper() { return require('./stepper'); },
  get Switch() { return require('./switch'); },
  get TabBar() { return require('./tab-bar'); },
  get Text() { return require('./text'); },
  get Toast() { return require('./toast'); },
  get View() { return require('./view'); },
  get WheelPickerDialog() { return require('./wheel-picker-dialog'); },
  // Other
  get Navigator() { return require('./navigator/Navigator'); },
  // Old
  get DrawerLayout() { return require('./DrawerLayout'); },
  get InfiniteScrollView() { return require('./InfiniteScrollView'); },
  get ItemsWithSeparator() { return require('./ItemsWithSeparator'); },
  // get ListContainer() { return require('./ListContainer'); },
  get PageControl() { return require('./PageControl'); },
  get Popover() { return require('./Popover'); },
  get SegmentedControl() { return require('./SegmentedControl'); },
  get SettingsList() { return require('./SettingsList'); },
  get StyleSheet() { return require('./StyleSheet'); },
  get ViewPager() { return require('./ViewPager'); },
};
*/
