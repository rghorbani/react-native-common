/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { StyleSheet } = require('react-native');
import { Text as RNText } from 'react-native';

const { BaseComponent } = require('../../commons');

class Text extends BaseComponent {
  static displayName = 'Text';

  static propTypes = {
    ...RNText.propTypes,
    ...BaseComponent.propTypes,
    /**
     * color of the text
     */
    color: PropTypes.string,
    /**
     * whether to center the text (using textAlign)
     */
    center: PropTypes.bool,
    testID: PropTypes.string,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps); // eslint-disable-line
  }

  render() {
    const color = this.props.color || this.extractColorValue();
    const typography = this.extractTypographyValue();
    const { center, style, ...props} = this.props;
    const { margins } = this.state;
    const textStyle = [
      this.styles.container,
      typography,
      color && {color},
      margins,
      center && {textAlign: 'center'},
      style
    ];
    return (
      <RNText {...props} style={textStyle}>
        {this.props.children}
      </RNText>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
    },
  });
}

module.exports = Text;
