/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const PropTypes = require('prop-types');
const { Animated, TextInput, ViewPropTypes } = require('react-native');

const { BaseComponent } = require('../../commons');
import {Colors, Typography} from '../../style';

class BaseInput extends BaseComponent {
  static displayName = 'BaseInput';

  static propTypes = {
    ...TextInput.propTypes,
    ...BaseComponent.propTypes,
    /**
     * rtl component
     */
    rtl: PropTypes.bool,
    /**
     * text color
     */
    color: PropTypes.string,
    /**
     * text input container style
     */
    containerStyle: ViewPropTypes.style,
    /**
     * Use to identify the component in tests
     */
    testId: PropTypes.string,
  };

  static defaultProps = {
    placeholderTextColor: Colors.dark60,
  };

  constructor(props) {
    super(props);

    const typography = this.getTypography();
    this.state = {
      inputWidth: typography.fontSize * 2,
      value: props.value,
      floatingPlaceholderState: new Animated.Value(props.value ? 1 : 0),
      showExpandableModal: !false,
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.focus = this.focus.bind(this);
  }

  getTypography() {
    return this.extractTypographyValue() || Typography.text70;
  }

  getUnderlineStyle() {
    const {focused} = this.state;
    const {error} = this.props;
    if (error) {
      return this.styles.errorUnderline;
    } else if (focused) {
      return this.styles.focusedUnderline;
    }

    return null;
  }

  hasText() {
    const {value} = this.state;
    return value && value.length > 0;
  }

  onFocus(...args) {
    this.props.onFocus && this.props.onFocus(...args);
    this.setState({focused: true});
  }

  onBlur(...args) {
    this.props.onBlur && this.props.onBlur(...args);
    this.setState({focused: false});
  }

  onChangeText(text) {
    this.props.onChangeText && this.props.onChangeText(text);

    this.setState({
      value: text,
    });
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  clear() {
    this.input.clear();
  }

  isFocused() {
    return this.input.isFocused();
  }
}

module.exports = BaseInput;
