/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */
'use strict';


var React = require('React');
var {
  Platform,
  Image,
  NativeModules,
  TouchableOpacity,
  View,
} = require('react-native');
var RGFColors = require('./RGFColors');
var RNCHeader = require('./RNCHeader');
var StyleSheet = require('./RNCStyleSheet');
var {Text} = require('./RGFText');

import type {Item as HeaderItem} from './RNCHeader';

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
    openDrawer: React.PropTypes.func,
    hasUnreadNotifications: React.PropTypes.number,
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.headerWrapper}>
          <RNCHeader
            title={this.props.title}
            leftItem={this.props.leftItem}
            rightItem={this.props.rightItem}
            extraItems={this.props.extraItems}>
          </RNCHeader>
        </View>
        <View style={styles.content}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
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
