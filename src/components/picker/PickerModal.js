/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const _ = require('lodash');
const { ScrollView, StyleSheet, TextInput } = require('react-native');

const View = require('../view');
const Image = require('../images/Image');
const Assets = require('../../assets');
const { Constants } = require('../../helpers');
const { BaseComponent } = require('../../commons');
const { Modal } = require('../../screen-components');
const { Colors, Typography } = require('../../style');

class PickerModal extends BaseComponent {
  static displayName = 'IGNORE';

  static propTypes = {
    ...Modal.propTypes,
    topBarProps: PropTypes.shape(Modal.TopBar.propTypes),
    scrollPosition: PropTypes.number,
    showSearch: PropTypes.bool,
    searchStyle: PropTypes.shape({
      color: PropTypes.string,
      placeholderTextColor: PropTypes.string,
      selectionColor: PropTypes.string,
    }),
    searchPlaceholder: PropTypes.string,
    onSearchChange: PropTypes.func,
  };

  static defaultProps = {
    searchPlaceholder: 'Search...',
    searchStyle: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      scrollHeight: undefined,
      scrollContentHeight: undefined,
    };

    this.onScrollViewLayout = this.onScrollViewLayout.bind(this);
    this.onScrollViewContentSizeChange = this.onScrollViewContentSizeChange.bind(
      this,
    );
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.scrollToSelected(nextProps.scrollPosition);
  }

  onScrollViewLayout({
    nativeEvent: {
      layout: { height },
    },
  }) {
    this.setState({ scrollHeight: height }, () => {
      this.scrollToSelected();
    });
  }

  onScrollViewContentSizeChange(contentWidth, contentHeight) {
    this.setState({ scrollContentHeight: contentHeight }, () => {
      this.scrollToSelected();
    });
  }

  scrollToSelected(scrollPosition = this.props.scrollPosition) {
    const isSearchFocused = _.invoke(this.search, 'isFocused');
    if (!scrollPosition || isSearchFocused) return;

    const { scrollHeight, scrollContentHeight } = this.state;
    if (this.scrollView && scrollHeight && scrollContentHeight) {
      const pageNumber = Math.floor(scrollPosition / scrollHeight);
      const numberOfPages = Math.ceil(scrollContentHeight / scrollHeight);

      if (pageNumber === numberOfPages - 1) {
        this.scrollView.scrollToEnd({ animated: false });
      } else {
        this.scrollView.scrollTo({
          x: 0,
          y: pageNumber * scrollHeight,
          animated: false,
        });
      }
    }
  }

  renderSearchInput() {
    const {
      showSearch,
      searchStyle,
      searchPlaceholder,
      onSearchChange,
    } = this.props;
    if (showSearch) {
      return (
        <View style={this.styles.searchInputContainer}>
          <Image style={this.styles.searchIcon} source={Assets.icons.search} />
          <TextInput
            ref={r => (this.search = r)}
            style={[this.styles.searchInput, { color: searchStyle.color }]}
            placeholderTextColor={searchStyle.placeholderTextColor}
            selectionColor={searchStyle.selectionColor}
            placeholder={searchPlaceholder}
            onChangeText={_.throttle(onSearchChange, 300)}
            autoCorrect={false}
            underlineColorAndroid="transparent"
          />
        </View>
      );
    }
  }

  render() {
    const { visible, enableModalBlur, topBarProps, children } = this.props;
    return (
      <Modal
        animationType={'slide'}
        transparent={Constants.isIOS && enableModalBlur}
        enableModalBlur={Constants.isIOS && enableModalBlur}
        visible={visible}
        onRequestClose={topBarProps.onCancel}
      >
        <Modal.TopBar {...topBarProps} />
        {this.renderSearchInput()}
        <ScrollView
          ref={r => (this.scrollView = r)}
          onLayout={this.onScrollViewLayout}
          onContentSizeChange={this.onScrollViewContentSizeChange}
          keyboardShouldPersistTaps="always"
        >
          <View style={this.styles.modalBody}>{children}</View>
        </ScrollView>
      </Modal>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    modalBody: {},
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: Colors.dark60,
    },
    searchIcon: {
      marginRight: 12,
    },
    searchInput: {
      height: 60,
      paddingRight: 16,
      flex: 1,
      ...Typography.text70,
    },
  });
}

module.exports = PickerModal;
