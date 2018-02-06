/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { Platform, ToolbarAndroid, StatusBar } = require('react-native');

const ItemWrapper = require('./ItemWrapper');
const Text = require('../text');
const View = require('../view');
const StyleSheet = require('../StyleSheet');
const { BaseComponent } = require('../../commons');
const { Colors, Shadows } = require('../../style');

class Header extends BaseComponent {
  static displayName = 'Header';

  static propTypes = {
    ...ToolbarAndroid.propTypes,
    /**
     * Using native toolbar (Only android)
     */
    useNative: PropTypes.bool,
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
    leftItems: PropTypes.oneOfType([PropTypes.shape(ItemWrapper.propTypes), PropTypes.arrayOf(PropTypes.shape(ItemWrapper.propTypes))]),
    /**
     * rightItems
     */
    rightItems: PropTypes.oneOfType([PropTypes.shape(ItemWrapper.propTypes), PropTypes.arrayOf(PropTypes.shape(ItemWrapper.propTypes))]),
    /**
     * extraItems
     */
    extraItems: PropTypes.oneOfType([PropTypes.shape(ItemWrapper.propTypes), PropTypes.arrayOf(PropTypes.shape(ItemWrapper.propTypes))]),
    /**
     * color of items
     */
    itemsColor: PropTypes.string,
    /**
     * style the action bar
     */
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    testID: PropTypes.string,
  };

  static defaultProps = {
    useNative: false,
    backgroundColor: Colors.white,
    titleColor: Colors.yellow,
    itemsColor: Colors.black
  };

  constructor(props) {
    super(props);

    this.state = {
      useNative: Platform.OS === 'ios' ? false : props.useNative,
    };
  }

  generateStyles() {
    let statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
    if (Platform.OS === 'android' && Platform.Version && Platform.Version < 21) {
      statusBarHeight = 0;
    }

    let headerHeight = Platform.OS === 'ios' ? 45 + statusBarHeight : 60 + statusBarHeight;
    if (this.props.height) {
      headerHeight = this.props.height;
    }

    this.styles = createStyles({
      height: headerHeight,
      statusBarHeight,
      backgroundColor: this.props.backgroundColor,
    });
  }

  renderNative() {
    let {
      titleColor,
      titleStyle,
      leftItems,
      rightItems,
      extraItems,
      style,
      ...props
    } = this.props;

    let actions = [];
    if (leftItems) {
      if (Array.isArray(leftItems)) {
        leftItems = leftItems[0];
      }
      const { title, icon, layout } = leftItems;
      actions.push({
        icon: layout !== 'title' ? icon : undefined,
        title: title,
        show: 'always'
      });
    }
    if (rightItems) {
      if (Array.isArray(rightItems)) {
        rightItems = rightItems[0];
      }
      const { title, icon, layout } = rightItems;
      actions.push({
        icon: layout !== 'title' ? icon : undefined,
        title: title,
        show: 'always'
      });
    }
    if (extraItems) {
      actions = actions.concat(
        extraItems.map(item => ({
          title: item.title,
          show: 'never'
        }))
      );
    }

    let content;
    if (React.Children.count(this.props.children) > 0) {
      content = (
        <View collapsable={false} style={{ flex: 1 }}>
          {this.props.children}
        </View>
      );
    } else {
      content = (
        <View collapsable={false} style={{ flex: 1, justifyContent: 'center' }}>
          <Text numberOfLines={1} style={[this.styles.headerTitle, { color: titleColor }, titleStyle]}>
            {this.props.title}
          </Text>
        </View>
      );
    }

    return (
      <View
        style={[
          this.styles.toolbarContainer,
          style
        ]}
      >
        <ToolbarAndroid
          {...props}
          navIcon={leftItems && leftItems.icon}
          onIconClicked={leftItems && leftItems.onPress}
          title={this.props.title}
          titleColor={titleColor}
          subtitleColor={titleColor}
          actions={actions}
          onActionSelected={this.handleActionSelected.bind(this)}
          style={this.styles.toolbar}
        >
          {content}
        </ToolbarAndroid>
        {/*
        */}
      </View>
    );
  }

  render() {
    let {
      titleColor,
      titleStyle,
      leftItems,
      rightItems,
      itemsColor,
      style,
    } = this.props;

    if (!Array.isArray(leftItems)) {
      leftItems = [leftItems];
    }
    if (!Array.isArray(rightItems)) {
      rightItems = [rightItems];
    }

    if (Platform.OS === 'android' && this.state.useNative) {
      return this.renderNative();
    }

    const content =
      React.Children.count(this.props.children) === 0 ? (
        <Text numberOfLines={1} style={[this.styles.headerTitle, { color: titleColor }, titleStyle]}>
          {this.props.title}
        </Text>
      ) : (
        this.props.children
      );

    return (
      <View
        style={[
          this.styles.container,
          style,
        ]}
      >
        <View style={this.styles.leftItems}>
          {leftItems.map((leftItem, index) => {
            return <ItemWrapper key={index} color={itemsColor} item={leftItem} />;
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
            return <ItemWrapper key={index} color={itemsColor} item={rightItem} />;
          })}
        </View>
      </View>
    );
  }
}

function createStyles({height, statusBarHeight, backgroundColor}) {
  return StyleSheet.create({
    toolbarContainer: {
      paddingTop: statusBarHeight,
    },
    toolbar: {
      height: height - statusBarHeight,
    },
    container: {
      height,
      paddingTop: statusBarHeight,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor,
      ...Shadows.white40.top,
    },
    leftItems: {
      flex: 1,
      alignItems: 'flex-start',
    },
    centerItems: {
      flex: 2,
      alignItems: 'center',
    },
    rightItems: {
      flex: 1,
      alignItems: 'flex-end',
    },
    itemWrapper: {
      padding: 11,
    },
    headerTitle: {
      ios: { fontSize: 17 },
      android: { fontSize: 20 },
    },
  });
}

module.exports = Header;
