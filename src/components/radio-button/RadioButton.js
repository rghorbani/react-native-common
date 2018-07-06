/**
 * Copyright 2016 Reza (github.com/rghorbani).
 *
 * @flow
 */

'use strict';

// TODO: update usage of React Context API to latest (https://reactjs.org/docs/context.html)
const React = require('react');
const PropTypes = require('prop-types');
const _ = require('lodash');
const { StyleSheet } = require('react-native');

const View = require('../view');
const { TouchableOpacity } = require('../touchables');
const { BaseComponent } = require('../../commons');
const { Colors } = require('../../style');

const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = Colors.blue30;

/**
 * A Radio Button component, should be wrapped inside a RadioGroup
 */
class RadioButton extends BaseComponent {
  static displayName = 'RadioButton';

  static propTypes = {
    /**
     * The identifier value of the radio button. must be different than other RadioButtons in the same group
     */
    value: PropTypes.string,
    /**
     * When using RadioButton without a RadioGroup, use this prop to toggle selection
     */
    selected: PropTypes.bool,
    /**
     * Invoked when pressing the button
     */
    onPress: PropTypes.func,
    /**
     * Invoked with the new value when the value changes.
     */
    onValueChange: PropTypes.func,
    /**
     * The color of the radio button
     */
    color: PropTypes.string,
    /**
     * The size of the radio button, affect both width & height
     */
    size: PropTypes.number,
    /**
     * The radio button border radius
     */
    borderRadius: PropTypes.number,
  };

  static contextTypes = {
    value: PropTypes.string,
    onValueChange: PropTypes.func,
  };

  state = {};

  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
  }

  onPress = () => {
    const {value} = this.props;
    _.invoke(this.context, 'onValueChange', value);
    _.invoke(this.props, 'onPress', this.isSelected());
  };

  isSelected() {
    const {value, selected} = this.props;
    // Individual Radio Button
    if (_.isUndefined(value)) {
      return Boolean(selected);
    }
    // Grouped Radio Button
    const {value: selectedValue} = this.context;
    return value === selectedValue;
  }

  render() {
    const {style, onPress, ...props} = this.getThemeProps();
    const Container = (onPress || this.context.onValueChange) ? TouchableOpacity : View;
    return (
      <Container
        activeOpacity={1}
        {...props}
        style={[this.styles.container, style]}
        onPress={this.onPress}
      >
        {this.isSelected() && <View style={this.styles.selectedIndicator} />}
      </Container>
    );
  }
}

function createStyles({size = DEFAULT_SIZE, borderRadius = DEFAULT_SIZE / 2, color = DEFAULT_COLOR}) {
  return StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: color,
      width: size,
      height: size,
      borderRadius,
      padding: 3,
    },
    selectedIndicator: {
      backgroundColor: color,
      flex: 1,
      borderRadius,
    },
  });
}

module.exports = RadioButton;
