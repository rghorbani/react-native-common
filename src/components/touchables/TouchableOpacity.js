const React = require('react');
const PropTypes = require('prop-types');
const _ = require('lodash');
import {TouchableOpacity as RNTouchableOpacity} from 'react-native';

const { BaseComponent } = require('../../commons');
const { ThemeManager } = require('../../style');

class TouchableOpacity extends BaseComponent {
  static displayName = 'TouchableOpacity';

  static propTypes = {
    /**
     * throttle time in MS for onPress callback
     */
    throttleTime: PropTypes.number,
    /**
     * throttle options
     */
    throttleOptions: PropTypes.shape({leading: PropTypes.bool, trailing: PropTypes.bool}),
    /**
     * Apply background color on TouchableOpacity when active (press is on)
     */
    activeBackgroundColor: PropTypes.string,
  };

  constructor(props) {
    super(props);

    const throttleTime = props.throttleTime || ThemeManager.components.TouchableOpacity.throttleTime;
    const throttleOptions = props.throttleOptions || ThemeManager.components.TouchableOpacity.throttleOptions;

    this.onPress = _.throttle(this.onPress.bind(this), throttleTime, throttleOptions);
    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
  }

  state = {
    active: false,
  };

  onPressIn(...args) {
    this.setState({
      active: true,
    });
    this.props.onPressIn && this.props.onPressIn(...args);
  }

  onPressOut(...args) {
    this.setState({
      active: false,
    });
    this.props.onPressOut && this.props.onPressOut(...args);
  }

  get backgroundStyle() {
    const { active } = this.state;
    const { activeBackgroundColor } = this.props;

    if (active && activeBackgroundColor) {
      return {backgroundColor: activeBackgroundColor};
    }
  }

  render() {
    const props = this.getThemeProps();

    return (
      <RNTouchableOpacity
        {...props}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        style={[this.props.style, this.backgroundStyle]}
      />
    );
  }

  onPress() {
    this.props.onPress && this.props.onPress();
  }
}

module.exports = TouchableOpacity;
