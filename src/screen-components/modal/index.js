const React = require('react');
const PropTypes = require('prop-types');

const { View } = require('react-native');
import { Modal as RNModal } from 'react-native';
import { BlurView } from 'react-native-blur';
const { BaseComponent } = require('../../commons');

const TopBar = require('./TopBar');

class Modal extends BaseComponent {
  static displayName = 'Modal';

  static propTypes = {
    enableModalBlur: PropTypes.bool,
  };

  render() {
    const {enableModalBlur, ...props} = this.props;
    const Container = enableModalBlur ? BlurView : View;
    return (
      <RNModal {...props}>
        <Container style={{flex: 1}} blurType="light">
          {this.props.children}
        </Container>
      </RNModal>
    );
  }
}

Modal.TopBar = TopBar;

module.exports = Modal;
