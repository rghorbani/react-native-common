/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

var React = require('React');
var {
  Image,
  Platform,
  ToolbarAndroid,
  TouchableOpacity,
  StatusBar,
  View,
} = require('react-native');
var StyleSheet = require('RGFStyleSheet');
import Ionicons from 'react-native-vector-icons/Ionicons';
// import LinearGradient from 'react-native-linear-gradient';
var RGFColors = require('RGFColors');
var { Text, NumText } = require('RGFText');

export type Layout =
    'default'      // Use platform defaults (icon on Android, text on iOS)
  | 'icon'         // Always use icon
  | 'title';       // Always use title

export type Foreground = 'light' | 'dark';

export type Item = {
  title?: string;
  icon?: number | string;
  layout?: Layout;
  badge: ?string;
  onPress?: () => void;
};

export type Props = {
  title?: string;
  leftItem?: Item;
  rightItem?: Item;
  extraItems?: Array<Item>;
  foreground?: Foreground;
  style?: any;
  children?: any;
};

class RGFHeaderAndroid extends React.Component {
  static height: number;
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      leftItem: undefined,
      actions: [],
    };
  }

  async componentDidMount() {
    const {leftItem, rightItem, extraItems} = this.props;
    let actions = [];
    if (leftItem) {
      const {title, icon} = rightItem;
      if (typeof icon === 'string') {
        icon = await Ionicons.getImageSource(icon, 24, 'white');
      }
      leftItem.icon = icon;
    }
    if (rightItem) {
      const {title, icon, layout} = rightItem;
      if (typeof icon === 'string') {
        icon = await Ionicons.getImageSource(icon, 24, 'white');
      }
      actions.push({
        icon: layout !== 'title' ? icon : undefined,
        title: title,
        show: 'always',
      });
    }
    if (extraItems) {
      actions = actions.concat(extraItems.map((item) => ({
        title: item.title,
        show: 'never',
      })));
    }
    this.setState({ leftItem, actions });
  }

  render() {
    const {rightItem, extraItems} = this.props;
    let leftItem = this.state.leftItem;
    let actions = this.state.actions;
    // if (rightItem) {
    //   const {title, icon, layout} = rightItem;
    //   if (typeof icon === 'string') {
    //     // icon = (<Ionicons name={icon} size={24} color="white" />);
    //     // icon = await Ionicons.getImageSource(icon, 24, 'white');
    //   }
    //   actions.push({
    //     // icon: layout !== 'title' ? icon : undefined,
    //     title: title,
    //     show: 'always',
    //   });
    // }
    // if (extraItems) {
    //   actions = actions.concat(extraItems.map((item) => ({
    //     title: item.title,
    //     show: 'never',
    //   })));
    // }

    const textColor = this.props.foreground === 'dark'
      ? RGFColors.blue
      : 'white';

    let content;
    if (React.Children.count(this.props.children) > 0) {
      content = (
        <View collapsable={false} style={{flex: 1}}>
          {this.props.children}
        </View>
      );
    }

    // <View style={[styles.toolbarContainer, this.props.style]}>
    return (
      <LinearGradient
        start={{x: 0, y: 1}} end={{x: 1, y: 1}}
        locations={[0, 0.5]}
        colors={['#2196F3', '#2196F3']}
        style={[styles.toolbarContainer, this.props.style]}>
        <ToolbarAndroid
          navIcon={leftItem && leftItem.icon}
          onIconClicked={leftItem && leftItem.onPress}
          title={this.props.title}
          titleColor={textColor}
          subtitleColor={textColor}
          actions={actions}
          onActionSelected={this.handleActionSelected.bind(this)}
          style={styles.toolbar}>
          {content}
        </ToolbarAndroid>
        {/*
        */}
      </LinearGradient>
    );
  }

  handleActionSelected(position: number) {
    let items = this.props.extraItems || [];
    if (this.props.rightItem) {
      items = [this.props.rightItem, ...items];
    }
    const item = items[position];
    item && item.onPress && item.onPress();
  }
}


class RGFHeaderIOS extends React.Component {
  static height: number;
  props: Props;

  render() {
    const {leftItem, title, rightItem, foreground} = this.props;
    const titleColor = foreground === 'dark' ? RGFColors.blue : 'white';
    const itemsColor = foreground === 'dark' ? RGFColors.blue : 'white';

    const content = typeof title === 'string'
      ? <Text style={[styles.titleText, {color: titleColor}]}>
          {title}
        </Text>
      : this.props.title;
      // <View style={[styles.header, this.props.style]}>
      // radial-gradient(circle farthest-corner at left bottom,#ffd08a 0,#ffa376 28%,#d26578 52%,#682a84 79%,#241668 100%)
    return (
      <View style={[styles.header, this.props.style]}>
        <View style={styles.leftItem}>
          <ItemWrapperIOS color={itemsColor} item={leftItem} />
        </View>
        <View
          accessible={true}
          accessibilityLabel={(typeof title === 'string') ? title : null}
          accessibilityTraits="header"
          style={styles.centerItem}>
          {content}
        </View>
        <View style={styles.rightItem}>
          <ItemWrapperIOS color={itemsColor} item={rightItem} />
        </View>
      </View>
    );
  }

}

class ItemWrapperIOS extends React.Component {
  props: {
    item: Item;
    color: string;
  };

  render() {
    const {item, color} = this.props;
    if (!item) {
      return null;
    }

    let content;
    var {title, icon, layout, badge, onPress} = item;

    if (!layout) {
      layout = 'normal';
    }

    if (layout === 'normal' && title) {
      content = (
        <Text style={[styles.itemText, {color}]}>
          {title.toUpperCase()}
        </Text>
      );
    } else if (layout === 'both' && title && icon) {
      if (typeof icon === 'string') {
        content = <Ionicons name={icon} size={33} color={color} />;
      } else {
        content = <Image source={icon} />;
      }
      content = (
        <View style={styles.itemGroup}>
          {content}
          <Text style={[styles.itemText, {color, paddingLeft: 5}]}>
            {title.toUpperCase()}
          </Text>
        </View>
      );
    } else if (layout === 'icon' && icon) {
      if (typeof icon === 'string') {
        content = <Ionicons name={icon} size={33} color={color} />;
      } else {
        content = <Image source={icon} />;
      }
    } else {
      return null;
    }

    var badgeView;
    if (badge) {
      badgeView = (
        <View style={styles.badge}>
          <NumText style={styles.badgeText}>
            {badge}
          </NumText>
        </View>
      );
    }
    return (
      <TouchableOpacity
        accessibilityLabel={title}
        accessibilityTraits="button"
        onPress={onPress}
        style={styles.itemWrapper}>
        {content}
        {badgeView}
      </TouchableOpacity>
    );
  }
}

var STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
var HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 65 + STATUS_BAR_HEIGHT;

var styles = StyleSheet.create({
  toolbarContainer: {
    paddingTop: STATUS_BAR_HEIGHT,
  },
  toolbar: {
    height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
  },
  header: {
    backgroundColor: RGFColors.headerBackground,
    paddingTop: STATUS_BAR_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ios: {
      height: HEADER_HEIGHT,
    },
    android: {
      height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
    },
  },
  titleText: {
    color: 'white',
    // fontWeight: 'bold',
    fontSize: 20,
  },
  leftItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerItem: {
    flex: 2,
    alignItems: 'center',
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
  itemWrapper: {
    padding: 11,
  },
  itemGroup: {
    flexDirection: 'row',
  },
  itemText: {
    alignSelf: 'center',
    letterSpacing: 1,
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(249, 14, 27)',
    paddingHorizontal: 7,
    paddingVertical: 1,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 14,
    color: 'white',
    textAlignVertical: 'center',
  },
});

// const Header = Platform.OS === 'ios' ? RGFHeaderIOS : RGFHeaderAndroid;
const Header = RGFHeaderIOS;
Header.height = HEADER_HEIGHT;
Header.tabBarIOSHeight = 49;
// $FlowFixMe
Header.__cards__ = (define) => {
  const menuItem = {
    title: 'Menu',
    icon: require('./img/hamburger.png'),
    onPress: () => alert('Menu button pressed!'),
  };
  const filterItem = {
    title: 'Filter',
    icon: require('./img/filter.png'),
    onPress: () => alert('Filter button pressed!'),
  };

  define('Simple', () => <Header title="Hello, world" />);
  define('With items', () => (
    <Header
      title="Default"
      leftItem={menuItem}
      rightItem={filterItem}
    />
  ));
  define('Forcing icons', () => (
    <Header
      title="Forcing icons"
      leftItem={{...menuItem, layout: 'icon'}}
      rightItem={{...filterItem, layout: 'icon'}}
    />
  ));
  define('Forcing title', () => (
    <Header
      title="Forcing title"
      leftItem={{...menuItem, layout: 'title'}}
      rightItem={{...filterItem, layout: 'title'}}
    />
  ));
  define('With content', () => (
    <Header leftItem={menuItem}>
      <View style={{backgroundColor: '#224488'}}>
        <Text style={{color: 'yellow'}}>
          Yellow text as title
        </Text>
      </View>
    </Header>
  ));
  define('With Background', () => (
    <Header
      title="With Background"
      leftItem={{...menuItem, layout: 'title'}}
      rightItem={{...filterItem, layout: 'title'}}
      style={{backgroundColor: '#224488'}}
    />
  ));
  define('With light background', () => (
    <Header
      title="Light Background"
      leftItem={{...menuItem, layout: 'title'}}
      rightItem={{...filterItem, layout: 'title'}}
      style={{backgroundColor: 'white'}}
      foreground="dark"
    />
  ));
};

module.exports = Header;
