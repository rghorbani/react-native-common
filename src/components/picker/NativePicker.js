/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const _ = require('lodash');
const PickerDialog = require('./PickerDialog');
const TextInput = require('../inputs/TextInput');
const WheelPicker = require('../../native-components/wheelpicker');
const { BaseComponent } = require('../../commons');

class Picker extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: this.props.value,
      items: this.extractPickerItems(this.props),
    };

    this.onCancel = this.onCancel.bind(this);
    this.onDone = this.onDone.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.renderPickerDialog = this.renderPickerDialog.bind(this);
  }

  extractPickerItems(props) {
    const { children, useNativePicker } = props;
    if (useNativePicker) {
      const items = React.Children.map(children, child => ({
        value: child.props.value,
        label: child.props.label,
      }));
      return items;
    }
  }

  onCancel() {
    this.setState({
      selectedValue: this.props.value,
    });
    this.input.toggleExpandableModal(false);
  }

  onDone() {
    const { selectedValue } = this.state;
    _.invoke(this.props, 'onChange', selectedValue);
    this.input.toggleExpandableModal(false);
  }

  onValueChange(selectedValue) {
    this.setState({
      selectedValue,
    });
  }

  getLabel() {
    const { value, getLabel } = this.props;

    if (_.isFunction(getLabel)) {
      return getLabel(value);
    }

    const { items } = this.state;
    const selectedItem = _.find(items, { value });
    return _.get(selectedItem, 'label');
  }

  renderPickerDialog() {
    const { selectedValue } = this.state;
    return (
      <PickerDialog
        {...this.getThemeProps()}
        onDismiss={this.onCancel}
        onValueChange={this.onValueChange}
        selectedValue={selectedValue}
        onDone={this.onDone}
        onCancel={this.onCancel}
      />
    );
  }

  render() {
    const textInputProps = TextInput.extractOwnProps(this.props);
    const label = this.getLabel();
    return (
      <TextInput
        ref={r => (this.input = r)}
        floatingPlaceholder={false}
        enableErrors={false}
        {...textInputProps}
        value={label}
        expandable
        editable={false}
        renderExpandable={this.renderPickerDialog}
      />
    );
  }
}

Picker.Item = WheelPicker.Item;

module.exports = Picker;
