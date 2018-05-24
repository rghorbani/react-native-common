/**
 * Copyright 2016 Reza (github.com/rghorbani).
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const _ = require('lodash');
const RNModal = require('react-native').Modal;
const { StyleSheet, TouchableWithoutFeedback } = require('react-native');
const { BlurView } = require('react-native-blur');

const TopBar = require('./TopBar');
const View = require('../../components/view');
const { BaseComponent } = require('../../commons');
const { Constants } = require('../../helpers');

class Modal extends BaseComponent {
  static displayName = 'Modal';

  static propTypes = {
    /**
     * Blurs the modal background when transparent (iOS only)
     */
    enableModalBlur: PropTypes.bool,
    /**
     * allow dismissing a modal when clicking on its background
     */
    onBackgroundPress: PropTypes.func,
    /**
     * the background color of the overlay
     */
    overlayBackgroundColor: PropTypes.string,
  };

  renderTouchableOverlay() {
    const {overlayBackgroundColor, onBackgroundPress} = this.props;
    if (_.isFunction(onBackgroundPress) || !!overlayBackgroundColor) {
      return (
        <View style={[styles.touchableOverlay, {backgroundColor: overlayBackgroundColor}]}>
          <TouchableWithoutFeedback onPress={onBackgroundPress}>
            <View flex />
          </TouchableWithoutFeedback>
        </View>
      );
    }
  }

  render() {
    const {enableModalBlur, visible, ...props} = this.props;
    const Container = enableModalBlur && Constants.isIOS ? BlurView : View;

    return (
      <RNModal visible={Boolean(visible)} {...props}>
        <Container style={{flex: 1}} blurType="light">
          {this.renderTouchableOverlay()}
          {this.props.children}
        </Container>
      </RNModal>
    );
  }
}

const styles = StyleSheet.create({
  touchableOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
});

Modal.TopBar = TopBar;

module.exports = Modal;
