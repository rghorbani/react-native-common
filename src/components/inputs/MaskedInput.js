/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

const React = require('react');
const PropTypes = require('prop-types');
const _ = require('lodash');
const { Keyboard, Text, TouchableOpacity, StyleSheet, View, ViewPropTypes } = require('react-native');

const TextInput = require('./TextInput');
const BaseInput = require('./BaseInput');

class MaskedInput extends BaseInput {
  static displayName = 'MaskedInput';

  static propTypes = {
    ...TextInput.propTypes,
    /**
     * callback for rendering the custom input out of the value returns from the actual input
     */
    renderMaskedText: PropTypes.func.isRequired,
    /**
     * container style for the masked input container
     */
    containerStyle: ViewPropTypes.style,
  };

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (this.isFocused()) {
        this.blur();
      }
    });
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  renderMaskedText() {
    const {renderMaskedText} = this.props;
    const {value} = this.state;

    if (_.isFunction(renderMaskedText)) {
      return renderMaskedText(value);
    }

    return <Text>{value}</Text>;
  }

  render() {
    return (
      <View style={this.props.containerStyle}>
        <TextInput
          {...this.props}
          ref={(input) => {
            this.input = input;
          }}
          containerStyle={styles.hiddenInputContainer}
          style={styles.hiddenInput}
          enableErrors={false}
          hideUnderline
          placeholder=""
          onChangeText={this.onChangeText}
        />
        <TouchableOpacity
          activeOpacity={1}
          style={styles.maskedInputWrapper}
          onPress={this.focus}
        >
          {this.renderMaskedText()}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hiddenInputContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  hiddenInput: {
    color: 'transparent',
    height: undefined,
  },
  maskedInputWrapper: {
    zIndex: 1,
  },
});

module.exports = MaskedInput;
