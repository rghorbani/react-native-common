/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { Platform, Image, TouchableOpacity, View } = require('react-native');

const Header = require('./Header');
const StyleSheet = require('./StyleSheet');

import type { Item as HeaderItem } from 'Header';

type Props = {
  title: string,
  leftItem?: HeaderItem,
  rightItem?: HeaderItem,
  extraItems?: Array<HeaderItem>,
  selectedSectionColor: string,
  backgroundImage: number,
  backgroundColor: string,
  children?: any,
};

class ListContainer extends React.Component {
  props: Props;

  static defaultProps = {
    selectedSectionColor: 'white',
  };

  static contextTypes = {
    openDrawer: PropTypes.func,
    hasUnreadNotifications: PropTypes.number,
  };

  constructor(props: Props) {
    super(props);

    (this: any).handleShowMenu = this.handleShowMenu.bind(this);
    (this: any).renderButton = this.renderButton.bind(this);
  }

  render() {
    let leftItem = this.props.leftItem;
    if (!leftItem && Platform.OS === 'android') {
      leftItem = {
        layout: 'icon',
        title: 'Menu',
        icon: this.context.hasUnreadNotifications
          ? require('./img/hamburger-unread.png')
          : require('./img/hamburger.png'),
        onPress: this.handleShowMenu,
      };
    }

    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.headerWrapper}>
          <Header
            title={this.props.title}
            leftItem={leftItem}
            rightItem={this.props.rightItem}
            extraItems={this.props.extraItems}
          />
        </View>
        <View style={styles.content}>{this.props.children}</View>
        {this.renderButton()}
      </View>
    );
  }

  handleShowMenu() {
    this.context.openDrawer();
  }

  renderButton() {
    if (Platform.OS === 'ios' || this.props.onPress === undefined) {
      return null;
    }

    return (
      <TouchableOpacity style={styles.addButton} onPress={this.props.onPress}>
        <Image source={require('./img/add.png')} />
      </TouchableOpacity>
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
    },
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
});

module.exports = ListContainer;
