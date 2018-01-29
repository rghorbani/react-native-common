/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
// import LinearGradient from 'react-native-linear-gradient';
const RGFColors = require('../RGFColors');

const {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = require('react-native');

class Button extends React.Component {
  props: {
    type: 'primary' | 'secondary' | 'bordered';
    icon?: number;
    iconStyle?: any;
    caption: string;
    captionStyle?: any;
    buttonStyle?: any;
    style?: any;
    onPress: () => mixed;
  };

  static defaultProps = {
    type: 'primary',
  };

  render() {
    const caption = this.props.caption;
    let icon;
    if (this.props.icon) {
      icon = <Image source={this.props.icon} style={[styles.icon, this.props.iconStyle]} />;
    }
    let content;
    if (this.props.type === 'primary') {
      content = (
        <View
          style={[styles.button, styles.primaryButton, this.props.buttonStyle]}>
          {icon}
          <Text style={[styles.caption, styles.primaryCaption, this.props.captionStyle]}>
            {caption}
          </Text>
        </View>
      );
    } else {
      var border = this.props.type === 'bordered' && styles.border;
      content = (
        <View style={[styles.button, border, this.props.buttonStyle]}>
          {icon}
          <Text style={[styles.caption, styles.secondaryCaption, this.props.captionStyle]}>
            {caption}
          </Text>
        </View>
      );
    }
    return (
      <TouchableOpacity
        accessibilityTraits="button"
        onPress={this.props.onPress}
        activeOpacity={0.8}
        style={[styles.container, this.props.style]}>
        {content}
      </TouchableOpacity>
    );
  }
}

const HEIGHT = 50;
Button.HEIGHT = HEIGHT;

var styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    backgroundColor: 'red',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  border: {
    borderWidth: 1,
    borderColor: RGFColors.lightText,
    borderRadius: HEIGHT / 2,
  },
  primaryButton: {
    borderRadius: HEIGHT / 2,
    backgroundColor: 'transparent',
  },
  icon: {
    marginRight: 12,
  },
  caption: {
    letterSpacing: 1,
    fontSize: 12,
  },
  primaryCaption: {
    color: 'white',
  },
  secondaryCaption: {
    color: RGFColors.lightText,
  }
});

module.exports = Button;
