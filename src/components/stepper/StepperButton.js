/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { Text, TouchableOpacity } = require('react-native');
const { BaseComponent } = require('../../commons');

class StepperButton extends BaseComponent {
  static displayName = 'IGNORE';

  static propTypes = {
    /**
     * Text to show on the button
     */
    label: PropTypes.string,
    /**
     * Disabled state of the button
     */
    disabled: PropTypes.bool,
    /**
     * Handler function to receive updates when the value changes
     */
    onPress: PropTypes.func,
    /**
     * Style from the parent component with `button` style, `buttonText` style and `disableText` style
     */
    styles: PropTypes.object.isRequired,
    /**
     * Use to identify the button in tests
     */
    testId: PropTypes.string,
  };

  render() {
    const {label, disabled, onPress, styles, testId} = this.props;
    return (
      <TouchableOpacity disabled={disabled} testID={testId} onPress={onPress} style={styles.button}>
        <Text style={[styles.buttonText, disabled && styles.disableText]} allowFontScaling={false}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
}

module.exports = StepperButton;
