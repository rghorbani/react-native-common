/**
 * Copyright 2016 Reza (github.com/rghorbani).
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const RNModal = require('react-native').Modal;
const { BlurView } = require('react-native-blur');
const { View } = require('react-native');

const TopBar = require('./TopBar');
const { BaseComponent } = require('../../commons');

class Modal extends BaseComponent {
  static displayName = 'Modal';

  static propTypes = {
    enableModalBlur: PropTypes.bool,
  };

  render() {
    const {enableModalBlur, ...others} = this.props;
    const Container = enableModalBlur ? BlurView : View;
    return (
      <RNModal {...others}>
        <Container style={{flex: 1}} blurType="light">
          {this.props.children}
        </Container>
      </RNModal>
    );
  }
}

Modal.TopBar = TopBar;

module.exports = Modal;
