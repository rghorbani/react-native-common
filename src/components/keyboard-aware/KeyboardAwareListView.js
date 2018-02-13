/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

const React = require('react');
const PropTypes = require('prop-types');
const KeyboardAwareBase = require('./KeyboardAwareBase');

const { ListView } = require('react-native');

class KeyboardAwareListView extends KeyboardAwareBase {
  static displayName = 'KeyboardAwareListView';

  static propTypes = {
    onScroll: PropTypes.func
  };

  static defaultProps = {
    ...KeyboardAwareBase.defaultProps
  };

  render() {
    const initialOpacity = this.props.startScrolledToBottom ? 0 : 1;
    return (
      <ListView
        {...this.props}
        {...this.style}
        opacity={initialOpacity}
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

module.exports = KeyboardAwareListView;
