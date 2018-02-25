/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { View, TextInput, StyleSheet } = require('react-native');

const BaseInput = require('./BaseInput');

class TextArea extends BaseInput {
  static displayName = 'TextArea';
  static propTypes = {
    ...TextInput.propTypes,
    ...BaseInput.propTypes,
    /**
     * rtl component
     */
    rtl: PropTypes.bool,
    /**
     * Use to identify the component in tests
     */
    testId: PropTypes.string,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {value} = this.state;
    const typography = this.getTypography();
    const inputStyle = [this.styles.input, typography];
    return (
      <View style={this.styles.container}>
        <TextInput
          {...this.props}
          value={value}
          multiline={true}
          style={inputStyle}
          underlineColorAndroid="transparent"
          onChangeText={this.onChangeText}
          ref={(input) => { this.input = input; }}
        />
      </View>
    );
  }
}

function createStyles({rtl}) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    input: {
      flex: 1,
      justifyContent: rtl ? 'flex-end' : 'flex-start',
      alignItems: rtl ? 'flex-end' : 'flex-start',
      textAlign: rtl ? 'right' : undefined,
      writingDirection: rtl ? 'auto' : undefined,
      textAlignVertical: 'top',
    },
  });
}

module.exports = TextArea;
