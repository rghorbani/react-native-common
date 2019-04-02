/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const _ = require('lodash');
const { StyleSheet } = require('react-native');

const Dialog = require('../dialog');
const View = require('../view');
const Text = require('../text');
const WheelPicker = require('../../native-components/wheelpicker');
const { BaseComponent } = require('../../commons');
const { Colors } = require('../../style');

class PickerDialog extends BaseComponent {
  static propTypes = {
    selectedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onValueChange: PropTypes.func,
    onDone: PropTypes.func,
    onCancel: PropTypes.func,
    topBarProps: PropTypes.object,
    children: PropTypes.array,
  };

  state = {};

  renderHeader() {
    const { onDone, onCancel, topBarProps } = this.props;

    return (
      <View style={styles.header}>
        <Text text70 blue30 onPress={onCancel}>
          {_.get(topBarProps, 'cancelLabel', 'Cancel')}
        </Text>
        <Text text70 blue30 onPress={onDone}>
          {_.get(topBarProps, 'doneLabel', 'Done')}
        </Text>
      </View>
    );
  }

  renderPicker() {
    const {
      children,
      onValueChange,
      selectedValue,
      renderNativePicker,
    } = this.props;
    if (_.isFunction(renderNativePicker)) {
      return renderNativePicker(this.props);
    }
    return (
      <WheelPicker onValueChange={onValueChange} selectedValue={selectedValue}>
        {children}
      </WheelPicker>
    );
  }

  render() {
    const dialogProps = Dialog.extractOwnProps(this.props);
    return (
      <Dialog
        {...dialogProps}
        visible
        height={250}
        width="100%"
        bottom
        animationConfig={{ duration: 300 }}
      >
        <View flex bg-white>
          {this.renderHeader()}
          <View centerV flex>
            {this.renderPicker()}
          </View>
        </View>
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 44,
    backgroundColor: Colors.dark80,
    paddingHorizontal: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

module.exports = PickerDialog;
