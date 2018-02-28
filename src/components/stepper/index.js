/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const _ = require('lodash');
const { PixelRatio, StyleSheet, Text, View } = require('react-native');
const StepperButton = require('./StepperButton');
const { BaseComponent } = require('../../commons');
const { Constants } = require('../../helpers');
const { Colors, ThemeManager, Typography } = require('../../style');

class Stepper extends BaseComponent {
  static displayName = 'Stepper';

  static propTypes = {
    /**
     * Text to show next to the current number
     */
    label: PropTypes.string,
    /**
     * Minimum value
     */
    min: PropTypes.number.isRequired,
    /**
     * Maximum value
     */
    max: PropTypes.number,
    /**
     * Additional styles for the top container
     */
    containerStyle: PropTypes.object,
    /**
     * Handler function to receive updates when the value changes
     */
    onValueChange: PropTypes.func,
    /**
     * the initial value
     */
    initialValue: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue,
    };
  }

  generateStyles() {
    this.styles = createStyles(this.props.size);
  }

  getLabel() {
    return [this.state.value, this.props.label].join(' ');
  }

  getDisabledState() {
    const minusDisabled = this.state.value === this.props.min;
    const plusDisabled = this.state.value === this.props.max;
    return {minusDisabled, plusDisabled};
  }

  updateValue(value) {
    let newValue = _.max([value, this.props.min]);
    newValue = _.min([newValue, this.props.max]);
    if (this.state.value !== newValue) {
      this.setState({
        value: newValue,
      }, () => {
        if (this.props.onValueChange) {
          this.props.onValueChange(newValue);
        }
      });
    }
  }

  render() {
    const {minusDisabled, plusDisabled} = this.getDisabledState();
    return (
      <View style={[this.styles.container, this.props.containerStyle]}>
        <View style={this.styles.title}>
          <Text testID={'label'} style={this.styles.titleText}>{this.getLabel()}</Text>
        </View>
        <View style={this.styles.buttons}>
          <StepperButton
            label="-"
            testId={'decrease'}
            styles={this.styles}
            disabled={minusDisabled}
            onPress={() => this.updateValue(this.state.value - 1)}
          />
          <View style={this.styles.separator}/>
          <StepperButton
            label="+"
            testId={'increase'}
            styles={this.styles}
            disabled={plusDisabled}
            onPress={() => this.updateValue(this.state.value + 1)}
          />
        </View>
      </View>
    );
  }
}

function createStyles() {
  const separatorColor = Colors.dark70;
  const bottomTextMargin = 4; // use margins to center the text until we move to using assets
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      // paddingLeft: Constants.isIOS ? 16 : undefined,
      // paddingRight: Constants.isIOS ? 16 : undefined,
    },
    buttons: {
      flexDirection: 'row',
      borderRadius: Constants.isIOS ? 21 : 2,
      borderWidth: 1,
      borderColor: separatorColor,
      width: Constants.isIOS ? 100 : 98,
      height: Constants.isIOS ? 42 : 35,
    },
    button: {
      flex: 0.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      justifyContent: 'center',
      flex: 0.6,
      height: Constants.isIOS ? 70 : 68,
    },
    titleText: {
      ...Typography.text70,
      color: Colors.dark10,
    },
    separator: {
      marginTop: Constants.isIOS ? 4 : 2,
      height: Constants.isIOS ? 32 : 30,
      borderWidth: Constants.isIOS ? 1 / PixelRatio.get() : undefined,
      borderLeftWidth: Constants.isIOS ? undefined : 1,
      borderColor: separatorColor,
    },
    buttonText: {
      ...Typography.text40,
      fontWeight: '200',
      color: ThemeManager.primaryColor,
      backgroundColor: 'transparent',
      marginBottom: bottomTextMargin,
    },
    disableText: {
      color: Colors.dark70,
      marginBottom: bottomTextMargin,
    },
  });
}

module.exports = Stepper;
