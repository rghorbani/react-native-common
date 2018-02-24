/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { ScrollView, StyleSheet, View } = require('react-native');

const { Constants } = require('../../helpers');
const { BaseComponent } = require('../../commons');
const { Modal } = require('../../screen-components');

class PickerModal extends BaseComponent {
  static displayName = 'IGNORE';

  static propTypes = {
    ...Modal.propTypes,
    topBarProps: PropTypes.shape(Modal.TopBar.propTypes),
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {visible, enableModalBlur, topBarProps, children} = this.props;
    return (
      <Modal
        animationType={'slide'}
        transparent={(Constants.isIOS && enableModalBlur)}
        enableModalBlur={Constants.isIOS && enableModalBlur}
        visible={visible}
        onRequestClose={topBarProps.onCancel}
      >
        <Modal.TopBar {...topBarProps}/>
        <ScrollView>
          <View style={this.styles.modalBody}>
            {children}
          </View>
        </ScrollView>
      </Modal>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    modalBody: {
      paddingTop: 30,
    },
  });
}

module.exports = PickerModal;
