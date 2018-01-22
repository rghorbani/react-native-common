/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

var React = require('react');
import Ionicons from 'react-native-vector-icons/Ionicons';

var {
  Dimensions,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} = require('react-native');
var { Text } = require('RGFText');
var RGFColors = require('RGFColors');
var env = require('Enviroment');

export type Props = {
  rtl: boolean;
  type: 'primary' | 'secondary';
  title: string;
  icon?: number;
  autoCapitalize: string;
  keyboardType: string;
  placeholderTextColor: string;
  secureTextEntry: boolean;
  onChangeText: ?() => void;
  maxLength?: number;
  style?: any;
  onPress: () => mixed;
};

class RGFTextInput extends React.Component {
  props: Props;

  state: {
    width: number;
    height: number;
  };

  static defaultProps = {
    rtl: true,
    showTitle: false,
    showBorder: true,
    type: 'primary',
    backgroundColor: 'transparent',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
    };

    (this: any).adjustInputWidth = this.adjustInputWidth.bind(this);
    (this: any).adjustInputHeight = this.adjustInputHeight.bind(this);
  }

  render() {
    let {icon, showBorder, style, ...props} = this.props;

    let image;
    if (icon) {
      if (typeof this.props.icon === 'string') {
        image = (
          <View style={styles.iconWrapper}>
            <Ionicons
              name={icon}
              size={30}
              color={RGFColors.inactiveText}
              style={[styles.icon, this.props.iconStyle]}
            />
          </View>
        );
      } else {
        image = (
          <View style={styles.iconWrapper}>
            <Image
              source={icon}
              style={[styles.icon, this.props.iconStyle]}
            />
          </View>
        );
      }
    }

    let customStyle = {backgroundColor: this.props.backgroundColor};
    let size = { width: this.state.width };

    if (this.props.rtl === false || this.props.keyboardType === 'numeric' || this.props.keyboardType === 'phone-pad') {
      size.fontFamily = env.digitFont;
      size.textAlign = 'left';
    }

    let titleStyle = {};
    if (this.props.titleColor) {
      titleStyle = {
        color: this.props.titleColor
      };
    }

    if (this.props.type === 'primary') {
      return (
        <View style={[styles.container, this.props.wrapperStyle]}>
          <View style={styles.inputWrapper}>
            {image}
            <View style={styles.inputWidth} onLayout={this.adjustInputWidth}>

              { this.props.showTitle ?
                <Text style={[styles.title, titleStyle]}>
                  {this.props.title}
                </Text>
              :
                null
              }

              <View
                onLayout={this.adjustInputHeight}
                style={[styles.inputHeight, customStyle]}>
                <TextInput
                  {...props}
                  style={[styles.input, size, style]}
                />
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          accessibilityTraits="button"
          onPress={this.props.onPress}
          activeOpacity={0.8}
          style={[styles.container, this.props.wrapperStyle]}>
          <View style={styles.inputWrapper}>
            {image}
            <View onLayout={this.adjustInputWidth}>

              { this.props.showTitle ?
                <Text style={[styles.title, titleStyle]}>
                  {this.props.title}
                </Text>
              :
                null
              }

              <View
                onLayout={this.adjustInputHeight}
                style={[styles.inputHeight, customStyle]}>
                <TextInput
                  {...props}
                  editable={false}
                  style={[styles.input, size, style]}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }

  adjustInputWidth(e: any) {
    this.setState({
      width: e.nativeEvent.layout.width,
    });
  }

  adjustInputHeight(e: any) {
    this.setState({
      height: e.nativeEvent.layout.height,
    });
  }
}

const HEIGHT = 50;
RGFTextInput.HEIGHT = HEIGHT;

var styles = StyleSheet.create({
  container: {
    height: HEIGHT,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWidth: {
    flex: 1,
  },
  inputHeight: {
    flex: 1,
  },
  iconWrapper: {
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
    tintColor: RGFColors.primary,
  },
  title: {
    fontSize: 15,
    color: RGFColors.lightText,
    marginBottom: 2,
    textAlign: 'right',
  },
  input: {
    fontFamily: env.textFont,
    textAlign: 'right',
    textAlignVertical: 'center',
    backgroundColor: 'transparent',
  },
});

module.exports = RGFTextInput;
