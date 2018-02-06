/**
 * Copyright 2016 Reza (github.com/rghorbani).
 *
 * @flow
 */

'use strict';

const React = require('react');
const { StyleSheet, ViewPropTypes } = require('react-native');
import { View as RNView } from 'react-native';

const { BaseComponent } = require('../../commons');

class View extends BaseComponent {
  static displayName = 'View';

  static propTypes = {
    ...ViewPropTypes,
    ...BaseComponent.propTypes,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps); // eslint-disable-line
  }

  render() {
    const {backgroundColor, borderRadius, paddings, margins, alignments, flexStyle} = this.state;
    const {style, ...props} = this.props;

    return (
      <RNView
        {...props}
        style={[
          this.styles.container,
          backgroundColor && {backgroundColor},
          borderRadius && {borderRadius},
          flexStyle,
          paddings,
          margins,
          alignments,
          style,
        ]}
        ref={r => (this.view = r)}
      >
        {this.props.children}
      </RNView>
    );
  }

  measure(...args) {
    this.view.measure(...args);
  }

  measureInWindow(...args) {
    this.view.measureInWindow(...args);
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {},
  });
}

module.exports = View;
