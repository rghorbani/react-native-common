/**
 * Copyright 2016 Reza (github.com/rghorbani).
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const Animatable = require('react-native-animatable');
const { StyleSheet, View } = require('react-native');

const ListItemPart = require('./ListItemPart');
const { TouchableOpacity } = require('../touchables');
const { Colors } = require('../../style');
const { BaseComponent } = require('../../commons');


/**
 * @description: List item component to render inside a ListView component
 * @extends: TouchableOpacity
 * @extendslink: docs/TouchableOpacity
 * @gif: https://media.giphy.com/media/l1IBjHowyPcOTWAY8/giphy.gif
 */
class ListItem extends BaseComponent {

  static displayName = 'ListItem';

  static propTypes = {
    /**
     * the list item height
     */
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * action for when pressing the item
     */
    onPress: PropTypes.func,
    /**
     * action for when long pressing the item
     */
    onLongPress: PropTypes.func,
    /**
     * Additional styles for the top container
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * The container element to wrap the ListItem
     */
    containerElement: PropTypes.func,
    /**
     * Use to identify the ListItem in tests
     */
    testID: PropTypes.string,
  };

  static defaultProps = {
    height: 63,
    containerElement: TouchableOpacity,
    underlayColor: Colors.dark70,
  };

  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
    };
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {
      containerElement,
      containerStyle,
      style,
      onPress,
      onLongPress,
      underlayColor,
      testID,
      ...others
    } = this.props;
    const {pressed} = this.state;
    // const containerStyle = this.extractContainerStyle(this.props);
    const animationProps = this.extractAnimationProps();
    const Container = (onPress || onLongPress) ? containerElement : View;

    const pressedStyle = {backgroundColor: underlayColor};

    return (
      <Container
        activeOpacity={1}
        style={[this.styles.container, containerStyle]}
        onPress={onPress}
        onLongPress={onLongPress}
        onHideUnderlay={() => this.setState({pressed: false})}
        onShowUnderlay={() => this.setState({pressed: true})}
        testID={testID}
        {...others}
      >
        <Animatable.View
          {...animationProps}
          style={[this.styles.innerContainer, style, pressed && pressedStyle]}
        >
          {this.props.children}
        </Animatable.View>
      </Container>
    );
  }
}

function createStyles({height}) {
  return StyleSheet.create({
    container: {
      backgroundColor: Colors.white,
    },
    innerContainer: {
      flexDirection: 'row',
      height,
    },
  });
}

ListItem.Part = ListItemPart;

module.exports = ListItem;
