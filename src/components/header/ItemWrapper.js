/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { Dimensions, Image, TouchableOpacity } = require('react-native');
const { BaseComponent, Text, View } = require('react-native-ui-lib');

import StyleSheet from '../other/StyleSheet';

const SCREEN_WIDTH = Dimensions.get('window').width;
const IOS_ITEM_TEXT_SIZE = SCREEN_WIDTH < 375 ? 10 : 13;

class ItemWrapper extends BaseComponent {
  static displayName = 'Header.ItemWrapper';

  static propTypes = {
    /**
     * item object
     */
    item: PropTypes.shape({
      title: PropTypes.string,
      icon: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.number,
      ]),
      iconSource: PropTypes.any,
      layout: PropTypes.oneOf(['default', 'both', 'icon', 'title']),
      onPress: PropTypes.func,
      style: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number,
        PropTypes.array,
      ]),
    }),
    /**
     * item color
     */
    color: PropTypes.string,
    /**
     * item size
     */
    size: PropTypes.number,
  };

  static defaultProps = {
    size: 30,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const { item, color, size } = this.props;
    if (!item) {
      return null;
    }

    let content;
    const { title, icon, iconSource, layout, onPress, style } = item;

    if (layout !== 'icon' && title) {
      content = (
        <Text text90 style={[this.styles.itemText, { color }, style]}>
          {title.toUpperCase()}
        </Text>
      );
    } else if (layout === 'both' && title && icon) {
      if (React.isValidElement(icon)) {
        content = icon;
      } else if (typeof icon === 'string') {
        const Icon = iconSource;
        content = <Icon name={icon} color={color} size={size} />;
      } else {
        content = <Image source={icon} style={[{ tintColor: color }, style]} />;
      }
      content = (
        <View style={this.styles.itemGroup}>
          {content}
          <Text
            text90
            style={[this.styles.itemText, { color, paddingLeft: 5 }]}
          >
            {title.toUpperCase()}
          </Text>
        </View>
      );
    } else if (icon) {
      if (React.isValidElement(icon)) {
        content = icon;
      } else if (typeof icon === 'string') {
        const Icon = iconSource;
        content = <Icon name={icon} color={color} size={size} />;
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
      padding: 5,
    },
    itemGroup: {
      flexDirection: 'row',
      // alignItems: 'center',
    },
    itemText: {
      alignSelf: 'center',
      letterSpacing: 1,
      fontWeight: '500',
      ios: {
        fontSize: IOS_ITEM_TEXT_SIZE,
      },
    },
  });
}

module.exports = ItemWrapper;
