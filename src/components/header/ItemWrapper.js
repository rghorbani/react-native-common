/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { Dimensions, Image, Text, TouchableOpacity, StyleSheet } = require('react-native');

const { BaseComponent } = require('../../commons');
const { Colors } = require('../../style');

const SCREEN_WIDTH = Dimensions.get("window").width;
const IOS_ITEM_TEXT_SIZE = SCREEN_WIDTH < 375 ? 10 : 13;

class ItemWrapper extends BaseComponent {
  static displayName = 'ItemWrapper';

  static propTypes = {
    /**
     * item object
     */
    item: PropTypes.shape({
      title: PropTypes.string,
      icon: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      iconSource: PropTypes.any,
      layout: PropTypes.oneOf(['default', 'icon', 'title']),
      onPress: PropTypes.func,
      style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    }),
    /**
     * item color
     */
    color: PropTypes.string,
  };

  static defaultProps = {
    size: 30,
  };

  constructor(props) {
    super(props);
  }

  generateStyles() {
    this.styles = createStyles();
  }

  render() {
    const { item, color, size } = this.props;
    if (!item) {
      return null;
    }

    let content;
    const { title, icon, iconSource, layout, onPress, style } = item;

    if (layout !== "icon" && title) {
      content = (
        <Text style={[this.styles.itemText, { color }, style]}>{title.toUpperCase()}</Text>
      );
    } else if (layout === 'both' && title && icon) {
      if (typeof icon === 'string') {
        const Icon = iconSource;
        content = <Icon name={icon} size={size} color={color} />;
      } else {
        content = <Image source={icon} style={[{ tintColor: color }, style]} />;
      }
      content = (
        <View style={styles.itemGroup}>
          {content}
          <Text style={[styles.itemText, {color, paddingLeft: 5}]}>
            {title.toUpperCase()}
          </Text>
        </View>
      );
    } else if (icon) {
      if (typeof icon === 'string') {
        const Icon = iconSource;
        content = <Icon name={icon} size={size} color={color} />;
      } else {
        content = <Image source={icon} style={[{ tintColor: color }, style]} />;
      }
    }

    return (
      <TouchableOpacity
        accessibilityLabel={title}
        accessibilityTraits="button"
        onPress={onPress}
        style={this.styles.itemWrapper}
      >
        {content}
      </TouchableOpacity>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    itemWrapper: {
      padding: 11
    },
    itemGroup: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemText: {
      fontSize: IOS_ITEM_TEXT_SIZE,
    },
  });
}

module.exports = ItemWrapper;
