/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { Platform, StyleSheet } = require('react-native');
const {
  BaseComponent,
  Constants,
  Colors,
  Shadows,
  Text,
  View,
} = require('react-native-ui-lib');
const ItemWrapper = require('./ItemWrapper');

class Header extends BaseComponent {
  static displayName = 'Header';

  static propTypes = {
    /**
     * header height
     */
    height: PropTypes.number,
    /**
     * header background color
     */
    backgroundColor: PropTypes.string,
    /**
     * title of header
     */
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    /**
     * color of title
     */
    titleColor: PropTypes.string,
    /**
     * style of title
     */
    titleStyle: Text.propTypes.style,
    /**
     * leftItems
     */
    leftItems: PropTypes.oneOfType([
      PropTypes.shape(ItemWrapper.propTypes),
      PropTypes.arrayOf(PropTypes.shape(ItemWrapper.propTypes)),
    ]),
    /**
     * rightItems
     */
    rightItems: PropTypes.oneOfType([
      PropTypes.shape(ItemWrapper.propTypes),
      PropTypes.arrayOf(PropTypes.shape(ItemWrapper.propTypes)),
    ]),
    /**
     * extraItems
     */
    extraItems: PropTypes.oneOfType([
      PropTypes.shape(ItemWrapper.propTypes),
      PropTypes.arrayOf(PropTypes.shape(ItemWrapper.propTypes)),
    ]),
    /**
     * color of items
     */
    itemsColor: PropTypes.string,
    /**
     * style the action bar
     */
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    /**
     * use safe area
     */
    useSafeArea: PropTypes.bool,
    /**
     * Use to identify the button in tests
     */
    testID: PropTypes.string,
  };

  static defaultProps = {
    useSafeArea: true,
    backgroundColor: Colors.white,
    titleColor: Colors.yellow,
    itemsColor: Colors.black,
  };

  constructor(props) {
    super(props);
  }

  generateStyles() {
    let statusBarHeight = Constants.statusBarHeight;
    if (
      Platform.OS === 'android' &&
      Platform.Version &&
      Platform.Version < 21
    ) {
      statusBarHeight = 0;
    }

    let height = Platform.OS === 'ios' ? 45 : 50;
    if (this.props.height) {
      height = this.props.height;
    }
    height += statusBarHeight;

    this.styles = createStyles({
      height: height,
      statusBarHeight,
      backgroundColor: this.props.backgroundColor,
      leftItems: this.props.leftItems,
      rightItems: this.props.rightItems,
    });
  }

  render() {
    let {
      titleColor,
      titleStyle,
      leftItems,
      rightItems,
      itemsColor,
      useSafeArea,
      style,
    } = this.props;

    if (!Array.isArray(leftItems)) {
      leftItems = [leftItems];
    }
    if (!Array.isArray(rightItems)) {
      rightItems = [rightItems];
    }

    const content =
      React.Children.count(this.props.children) === 0 ? (
        <Text
          text70
          numberOfLines={1}
          style={[this.styles.title, { color: titleColor }, titleStyle]}
        >
          {this.props.title}
        </Text>
      ) : (
        this.props.children
      );

    let wrapper = (
      <View style={[this.styles.container, style]}>
        <View style={this.styles.leftItems}>
          {leftItems.map((leftItem, index) => {
            return (
              <ItemWrapper key={index} color={itemsColor} item={leftItem} />
            );
          })}
        </View>
        <View
          accessible={true}
          accessibilityLabel={this.props.title}
          accessibilityTraits="header"
          style={this.styles.centerItems}
        >
          {content}
        </View>
        <View style={this.styles.rightItems}>
          {rightItems.map((rightItem, index) => {
            return (
              <ItemWrapper key={index} color={itemsColor} item={rightItem} />
            );
          })}
        </View>
      </View>
    );

    if (Constants.isIOS && useSafeArea) {
      wrapper = <View useSafeArea={useSafeArea}>{wrapper}</View>;
    }
    return wrapper;
  }
}

function createStyles({
  height,
  statusBarHeight,
  backgroundColor,
  leftItems,
  rightItems,
}) {
  const leftMore = Array.isArray(leftItems) && leftItems.length > 2;
  const rightMore = Array.isArray(rightItems) && rightItems.length > 2;

  return StyleSheet.create({
    toolbarContainer: {
      paddingTop: statusBarHeight,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: 'rgba(0, 0, 0, .3)',
    },
    toolbar: {
      height: height - statusBarHeight,
    },
    container: {
      height,
      paddingTop: statusBarHeight,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor,
      elevation: 4,
      ...Shadows.white10.bottom,
    },
    leftItems: {
      flex: leftMore ? 0 : 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    centerItems: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightItems: {
      flex: rightMore ? 0 : 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    title: {},
  });
}

module.exports = Header;
