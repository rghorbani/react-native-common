/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const _ = require('lodash');
const { Keyboard, StyleSheet, ViewPropTypes } = require('react-native');

const BaseInput = require('./BaseInput');
const TextInput = require('./TextInput');
const Text = require('../text');
const View = require('../view');
const { TouchableOpacity } = require('../touchables');

/**
 * @description: Mask Input to create custom looking inputs with custom formats
 * @extends: TextInput
 * @extendslink: docs/TagsInput
 * @gif: https://camo.githubusercontent.com/61eedb65e968845d5eac713dcd21a69691571fb1/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f4b5a5a7446666f486f454b334b2f67697068792e676966
 */
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
      if (_.invoke(this, 'isFocused')) {
        _.invoke(this, 'blur');
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
    const { containerStyle } = this.props;
    const TextInputProps = TextInput.extractOwnProps(this.props, ['containerStyle']);

    return (
      <View style={[containerStyle]}>
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
          {...TextInputProps}
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
