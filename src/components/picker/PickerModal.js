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
    scrollPosition: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      scrollHeight: undefined,
      scrollContentHeight: undefined,
    };

    this.onScrollViewLayout = this.onScrollViewLayout.bind(this);
    this.onScrollViewContentSizeChange = this.onScrollViewContentSizeChange.bind(this);
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.scrollToSelected(nextProps.scrollPosition);
  }

  onScrollViewLayout({nativeEvent: {layout: {height}}}) {
    this.setState({scrollHeight: height}, () => {
      this.scrollToSelected();
    });
  }

  onScrollViewContentSizeChange(contentWidth, contentHeight) {
    this.setState({scrollContentHeight: contentHeight}, () => {
      this.scrollToSelected();
    });
  }

  scrollToSelected(scrollPosition = this.props.scrollPosition) {
    if (!scrollPosition) return;

    const {scrollHeight, scrollContentHeight} = this.state;
    if (this.scrollView && scrollHeight && scrollContentHeight) {
      const pageNumber = Math.floor(scrollPosition / scrollHeight);
      const numberOfPages = Math.ceil(scrollContentHeight / scrollHeight);

      if (pageNumber === numberOfPages - 1) {
        this.scrollView.scrollToEnd({animated: false});
      } else {
        this.scrollView.scrollTo({x: 0, y: pageNumber * scrollHeight, animated: false});
      }
    }
  }

  render() {
    const {visible, enableModalBlur, topBarProps, children} = this.props;
    return (
      <Modal
        animationType={'slide'}
        transparent={Constants.isIOS && enableModalBlur}
        enableModalBlur={Constants.isIOS && enableModalBlur}
        visible={visible}
        onRequestClose={topBarProps.onCancel}
      >
        <Modal.TopBar {...topBarProps}/>
        <ScrollView
          ref={r => (this.scrollView = r)}
          onLayout={this.onScrollViewLayout}
          onContentSizeChange={this.onScrollViewContentSizeChange}
        >
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
