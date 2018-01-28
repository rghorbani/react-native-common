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
  TouchableOpacity,
  View,
} = require('react-native');
const {
  RGFColors,
  Touchable,
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
    let selectedTitleStyle = this.props.selected && styles.selectedTitle;
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.container}>
          <Text style={[styles.title, selectedTitleStyle]}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  icon: {
    marginLeft: 20,
  },
  title: {
    flex: 1,
    fontSize: 17,
    // color: RGFColors.lightText,
  },
  selectedTitle: {
    // color: RGFColors.darkText,
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
