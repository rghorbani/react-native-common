/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { StyleSheet } = require('react-native');

const Dialog = require('../dialog');
const View = require('../view');
const Text = require('../text');
const WheelPicker = require('../../native-components/wheelpicker');
const {Colors} = require('../../style');

class PickerDialog extends React.Component {
  static propTypes = {
    selectedValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onValueChange: PropTypes.func,
    onDone: PropTypes.func,
    onCancel: PropTypes.func,
    children: PropTypes.array,
  };

  state = {};

  renderHeader() {
    const {onDone, onCancel} = this.props;

    return (
      <View style={styles.header}>
        <Text text70 blue30 onPress={onCancel}>
          Cancel
        </Text>
        <Text text70 blue30 onPress={onDone}>
          Done
        </Text>
      </View>
    );
  }

  render() {
    const {children, onValueChange, selectedValue} = this.props;
    const dialogProps = Dialog.extractOwnProps(this.props);
    return (
      <Dialog {...dialogProps} visible height={250} width="100%" bottom animationConfig={{duration: 300}}>
        <View flex bg-white>
          {this.renderHeader()}
          <View centerV flex>
            <WheelPicker onValueChange={onValueChange} selectedValue={selectedValue}>
              {children}
            </WheelPicker>
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
