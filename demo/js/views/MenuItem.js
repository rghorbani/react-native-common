/**
 * Copyright 2016 Reza (github.com/rghorbani).
 *
 * @flow
 */

'use strict';

const React = require('react');

const {
  Image,
  StyleSheet,
  Text,
  View,
} = require('react-native');
const {
  RGFColors,
  RGFTouchable,
} = require('react-native-common');

class MenuItem extends React.Component {
  props: {
    icon: number;
    selectedIcon: number;
    selected: boolean;
    title: string;
    badge: ?string;
    onPress: () => void;
  };

  render() {
    console.log(this.props.icon);
    let icon = this.props.selected ? this.props.selectedIcon : this.props.icon;
    let selectedTitleStyle = this.props.selected && styles.selectedTitle;
    let badge;
    if (this.props.badge) {
      badge = (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {this.props.badge}
          </Text>
        </View>
      );
    }
    return (
      <RGFTouchable onPress={this.props.onPress}>
        <View style={styles.container}>
          <Image style={styles.icon} source={icon} />
          <Text style={[styles.title, selectedTitleStyle]}>
            {this.props.title}
          </Text>
          {badge}
        </View>
      </RGFTouchable>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    marginLeft: 20,
  },
  title: {
    flex: 1,
    fontSize: 17,
    color: RGFColors.lightText,
  },
  selectedTitle: {
    color: RGFColors.darkText,
  },
  badge: {
    backgroundColor: '#DC3883',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 12,
    color: 'white',
  },
});

module.exports = MenuItem;
