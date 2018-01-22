/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

const React = require('react');
const PropTypes = require('prop-types');

import ReactNative, {
  DeviceEventEmitter,
  Keyboard,
  NativeModules,
  InteractionManager
} from 'react-native';

const ScrollViewManager = NativeModules.ScrollViewManager;

class KeyboardAwareBase extends React.Component {

  static propTypes = {
    startScrolledToBottom: PropTypes.bool,
    scrollToBottomOnKBShow: PropTypes.bool,
    scrollToInputAdditionalOffset: PropTypes.number,
  };

  static defaultProps = {
    startScrolledToBottom: false,
    scrollToBottomOnKBShow: false,
    scrollToInputAdditionalOffset: 75,
  };

  constructor(props) {
    super(props);

    this.bind('onKeyboardWillShow', 'onKeyboardWillHide', 'addKeyboardEventListeners', 'removeKeyboardListeners', 'scrollToFocusedTextInput', 'onKeyboardAwareViewLayout', 'scrollToBottom', 'scrollBottomOnNextSizeChange');

    this.state = {
      keyboardHeight: 0,
    };
  }

  bind(...methods) {
    methods.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  addKeyboardEventListeners() {
    const KeyboardEventsObj = Keyboard || DeviceEventEmitter;
    this.keyboardEventListeners = [
      KeyboardEventsObj.addListener('keyboardWillShow', this.onKeyboardWillShow),
      KeyboardEventsObj.addListener('keyboardWillHide', this.onKeyboardWillHide)
    ];
  }

  removeKeyboardListeners() {
    this.keyboardEventListeners.forEach((eventListener) => eventListener.remove());
  }

  componentWillMount() {
    this.addKeyboardEventListeners();
  }

  componentDidMount() {
    if(this.keyboardAwareView && this.props.startScrolledToBottom) {
      this.scrollToBottom(false);
      setTimeout(() => this.keyboardAwareView.setNativeProps({ opacity: 1 }), 100);
    }
  }

  onKeyboardAwareViewLayout(layout) {
    this.keyboardAwareView.layout = layout;
    this.keyboardAwareView.contentOffset = {x: 0, y: 0};
    this.updateKeyboardAwareViewContentSize();
  }

  onKeyboardAwareViewScroll(contentOffset) {
    this.keyboardAwareView.contentOffset = contentOffset;
    this.updateKeyboardAwareViewContentSize();
  }

  updateKeyboardAwareViewContentSize() {
    if(ScrollViewManager && ScrollViewManager.getContentSize) {
      ScrollViewManager.getContentSize(ReactNative.findNodeHandle(this.keyboardAwareView), (res)=> {
        if(this.keyboardAwareView) {
          this.keyboardAwareView.contentSize = res;
          if(this.state.scrollBottomOnNextSizeChange) {
            this.scrollToBottom();
            this.state.scrollBottomOnNextSizeChange = false;
          }
        }
      })
    }
  }

  componentWillUnmount() {
    this.removeKeyboardListeners();
  }

  scrollToFocusedTextInput() {
    if (this.props.getTextInputRefs) {
      const textInputRefs = this.props.getTextInputRefs();
      textInputRefs.some((textInputRef, index, array) => {
        const isFocusedFunc = textInputRef.isFocused();
        const isFocused = isFocusedFunc && (typeof isFocusedFunc === "function") ? isFocusedFunc() : isFocusedFunc;
        if (isFocused) {
          setTimeout(() => {
            this.keyboardAwareView.getScrollResponder().scrollResponderScrollNativeHandleToKeyboard(
              ReactNative.findNodeHandle(textInputRef), this.props.scrollToInputAdditionalOffset, true);
          }, 0);
        }
        return isFocused;
      });
    }
  }

  onKeyboardWillShow(event) {
    this.scrollToFocusedTextInput();

    const newKeyboardHeight = event.endCoordinates.height;
    if (this.state.keyboardHeight === newKeyboardHeight) {
      return;
    }

    this.setState({keyboardHeight: newKeyboardHeight});

    if(this.props.scrollToBottomOnKBShow) {
      this.scrollToBottom();
    }
  }

  onKeyboardWillHide(event) {
    const keyboardHeight = this.state.keyboardHeight;
    this.setState({keyboardHeight: 0});

    const hasYOffset = this.keyboardAwareView && this.keyboardAwareView.contentOffset && this.keyboardAwareView.contentOffset.y !== undefined;
    const yOffset = hasYOffset ? Math.max(this.keyboardAwareView.contentOffset.y - keyboardHeight, 0) : 0;
    this.keyboardAwareView.scrollTo({x: 0, y: yOffset, animated: true});
  }

  scrollBottomOnNextSizeChange() {
    this.state.scrollBottomOnNextSizeChange = true;
  }

  scrollToBottom(scrollAnimated = true) {
    if (this.keyboardAwareView) {

      if(!this.keyboardAwareView.contentSize) {
        setTimeout(() => this.scrollToBottom(scrollAnimated), 50);
        return;
      }

      const bottomYOffset = this.keyboardAwareView.contentSize.height - this.keyboardAwareView.layout.height + this.keyboardAwareView.props.contentInset.bottom;
      this.keyboardAwareView.scrollTo({x: 0, y: bottomYOffset, animated: scrollAnimated});
    }
  }

  scrollTo(options) {
    if (this.keyboardAwareView) {
      this.keyboardAwareView.scrollTo(options);
    }
  }
}

module.exports = KeyboardAwareBase;
