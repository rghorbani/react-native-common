/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

const React = require('react');
const PropTypes = require('prop-types');
const KeyboardAwareBase = require('./KeyboardAwareBase');

const { ScrollView } = require('react-native');

class KeyboardAwareScrollView extends KeyboardAwareBase {

  static propTypes = {
    getTextInputRefs: PropTypes.func,
    onScroll: PropTypes.func
  };

  static defaultProps = {
    ...KeyboardAwareBase.defaultProps,
    getTextInputRefs: () => {
      return [];
    }
  };

  render() {
    return (
      <ScrollView
        {...this.props}
        {...this.style}
        contentInset={{bottom: this.state.keyboardHeight}}
        ref={(r) => {
          this.keyboardAwareView = r;
        }}
        onLayout={(layoutEvent) => {
          this.onKeyboardAwareViewLayout(layoutEvent.nativeEvent.layout);
        }}
        onScroll={(event) => {
          this.onKeyboardAwareViewScroll(event.nativeEvent.contentOffset);
          if (this.props.onScroll) {
            this.props.onScroll(event);
          }
        }}
        onContentSizeChange={() => {
          this.updateKeyboardAwareViewContentSize();
        }}
        scrollEventThrottle={200}
      />
    );
  }
}

module.exports = KeyboardAwareScrollView;
