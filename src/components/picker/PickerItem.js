/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const _ = require('lodash');
const { Image, StyleSheet } = require('react-native');

const View = require('../view');
const Text = require('../text');
const Assets = require('../../assets');
const { TouchableOpacity } = require('../touchables');
const { BaseComponent } = require('../../commons');
const { Colors, Typography, ThemeManager } = require('../../style');

// TODO: deprecate passing an an object as a value, use label and value props separately
/**
 * @description: Picker.Item, for configuring the Picker's selectable options
 * @extends: TouchableOpacity
 * @extendslink: docs/TouchableOpacity
 */
class PickerItem extends BaseComponent {
  static displayName = 'Picker.Item';

  static propTypes = {
    /**
     * [DEPRECATED - please include the label in the value prop] The item label
     */
    label: PropTypes.string,
    /**
     * The item value with the following format - {value: ..., label: ...},
     * for custom shape use getItemLabel, getItemValue props
     */
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * Function to return the label out of the item value prop when value is custom shaped.
     */
    getItemLabel: PropTypes.func,
    /**
     * Function to return the value out of the item value prop when value is custom shaped.
     */
    getItemValue: PropTypes.func,
    /**
     * Is the item selected
     */
    isSelected: PropTypes.bool,
    /**
     * Is the item disabled
     */
    disabled: PropTypes.bool,
    /**
     * Render custom item
     */
    renderItem: PropTypes.func,
    /**
     * Callback for onPress action
     */
    onPress: PropTypes.func,
    /**
     * Callback for onLayout event
     */
    onSelectedLayout: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onSelectedLayout = this.onSelectedLayout.bind(this);
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getLabel() {
    const { value, label } = this.props;
    if (_.isObject(value)) {
      return (
        _.invoke(this.props, 'getItemLabel', value) || _.get(value, 'label')
      );
    }
    return label;
  }

  renderSelectedIndicator() {
    const { isSelected, disabled } = this.props;
    if (isSelected) {
      return (
        <Image
          style={[
            this.styles.checkIcon,
            disabled && this.styles.checkIconDisabled,
          ]}
          source={Assets.icons.check}
        />
      );
    }
  }

  renderItem() {
    const { disabled } = this.props;
    return (
      <View flex row spread centerV style={this.styles.container}>
        <Text
          numberOfLines={1}
          style={[
            this.styles.labelText,
            disabled && this.styles.labelTextDisabled,
          ]}
        >
          {this.getLabel()}
        </Text>
        {this.renderSelectedIndicator()}
      </View>
    );
  }

  onSelectedLayout(...args) {
    this.props.onSelectedLayout && this.props.onSelectedLayout(...args);
  }

  render() {
    const {
      renderItem,
      label,
      value,
      disabled,
      onPress,
      isSelected,
      testID,
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        // todo: deprecate the check for object
        onPress={() => onPress(_.isObject(value) ? value : { value, label })}
        onLayout={isSelected ? this.onSelectedLayout : undefined}
        disabled={disabled}
        testID={testID}
      >
        {renderItem ? renderItem(value, this.props) : this.renderItem()}
      </TouchableOpacity>
    );
  }
}

function createStyles({ rtl }) {
  return StyleSheet.create({
    container: {
      height: 56.5,
      paddingHorizontal: 23,
      borderColor: Colors.rgba(Colors.dark10, 0.1),
      borderBottomWidth: 1,
      flexDirection: rtl ? 'row-reverse' : 'row',
    },
    labelText: {
      ...Typography.text70,
      color: Colors.dark10,
      flex: 1,
      textAlign: rtl ? 'right' : 'left',
    },
    labelTextDisabled: {
      color: Colors.dark60,
    },
    checkIcon: {
      tintColor: ThemeManager.primaryColor,
    },
    checkIconDisabled: {
      tintColor: Colors.dark60,
    },
  });
}

module.exports = PickerItem;
