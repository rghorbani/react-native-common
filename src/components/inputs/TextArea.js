/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput as RNTextInput, StyleSheet } from 'react-native';
import BaseInput from './BaseInput';

export default class TextArea extends BaseInput {
  static displayName = 'TextArea';
  static propTypes = {
    ...RNTextInput.propTypes,
    ...BaseInput.propTypes,
    /**
     * make component rtl
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
    const { value } = this.state;
    const typography = this.getTypography();
    const inputStyle = [this.styles.input, typography];
    return (
      <View style={this.styles.container}>
        <RNTextInput
          {...this.props}
          value={value}
          multiline
          style={inputStyle}
          underlineColorAndroid="transparent"
          onChangeText={this.onChangeText}
          ref={input => {
            this.input = input;
          }}
        />
      </View>
    );
  }
}

function createStyles({ rtl }) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    input: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      textAlignVertical: 'top',
      textAlign: rtl ? 'right' : undefined,
      writingDirection: rtl ? 'rtl' : undefined,
    },
  });
}
