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
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} = require('react-native');

import StyleSheet from './StyleSheet';

class SegmentedControl extends React.Component {
  static displayName = 'PageControl';

  static propTypes: {
    values: PropTypes.array,
    selectionColor: PropTypes.string,
    selectedIndex: PropTypes.number,
    onChange: PropTypes.func,
    titleStyle: PropTypes.any,
    segmentStyle: PropTypes.any,
    style: ViewPropTypes.style,
  };

  render() {
    let segments = this.props.values.map((value, index) => (
      <Segment
        key={value}
        value={value}
        titleStyle={this.props.titleStyle}
        segmentStyle={this.props.segmentStyle}
        isSelected={index === this.props.selectedIndex}
        selectionColor={this.props.selectionColor || 'white'}
        onPress={() => this.props.onChange(index)}
      />
    ));
    return <View style={[styles.container, this.props.style]}>{segments}</View>;
  }
}

class Segment extends React.Component {
  props: {
    value: string,
    isSelected: boolean,
    selectionColor: string,
    segmentStyle?: any,
    titleStyle?: any,
    onPress: () => void,
  };

  render() {
    let selectedButtonStyle;
    if (this.props.isSelected) {
      selectedButtonStyle = { borderColor: this.props.selectionColor };
    }
    let deselectedLabelStyle;
    if (!this.props.isSelected && Platform.OS === 'android') {
      deselectedLabelStyle = styles.deselectedLabel;
    }
    let title = this.props.value && this.props.value.toUpperCase();

    let accessibilityTraits = ['button'];
    if (this.props.isSelected) {
      accessibilityTraits.push('selected');
    }

    return (
      <TouchableOpacity
        accessibilityTraits={accessibilityTraits}
        activeOpacity={0.8}
        onPress={this.props.onPress}
        style={[styles.button, selectedButtonStyle, this.props.segmentStyle]}
      >
        <Text style={[styles.label, deselectedLabelStyle, styles.titleStyle]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const HEIGHT = 32;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    ios: {
      paddingBottom: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    android: {
      paddingLeft: 60,
    },
  },
  button: {
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    ios: {
      height: HEIGHT,
      paddingHorizontal: 20,
      borderRadius: HEIGHT / 2,
      borderWidth: 1,
    },
    android: {
      paddingBottom: 6,
      paddingHorizontal: 10,
      borderBottomWidth: 3,
      marginRight: 10,
    },
  },
  label: {
    letterSpacing: 1,
    fontSize: 12,
    color: 'white',
  },
  deselectedLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

module.exports = SegmentedControl;
