/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */
'use strict';


const React = require('react');
const PropTypes = require('prop-types');
const {
  Platform,
  Image,
  NativeModules,
  TouchableOpacity,
  View,
} = require('react-native');

const RGFColors = require('./RGFColors');
const Header = require('./Header');
const StyleSheet = require('./StyleSheet');

import type {Item as HeaderItem} from './Header';

type Props = {
  title: string;
  leftItem?: HeaderItem;
  rightItem?: HeaderItem;
  extraItems?: Array<HeaderItem>;
  backgroundImage: number;
  backgroundColor: string;
  children?: any;
};

class PageContainer extends React.Component {
  props: Props;

  static contextTypes = {
    openDrawer: PropTypes.func,
    hasUnreadNotifications: PropTypes.number,
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.headerWrapper}>
          <Header
            title={this.props.title}
            leftItem={this.props.leftItem}
            rightItem={this.props.rightItem}
            extraItems={this.props.extraItems}>
          </Header>
        </View>
        <View style={styles.content}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  headerWrapper: {
    android: {
      elevation: 2,
      backgroundColor: 'transparent',
      // FIXME: elevation doesn't seem to work without setting border
      borderRightWidth: 1,
      marginRight: -1,
      borderRightColor: 'transparent',
    }
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
});

module.exports = PageContainer;
