/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const {
  PixelRatio,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  Switch,
  View,
  ViewPropTypes,
} = require('react-native');
const ARROW_ICON = require('./img/disclosure.png');

class SettingsList extends React.Component {
  static displayName = 'SettingsList';

  static propTypes = {
    rtl: PropTypes.bool,
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    defaultItemSize: PropTypes.number,
    underlayColor: PropTypes.string,
    defaultTitleStyle: Text.propTypes.style,
    defaultTitleInfoPosition: PropTypes.string,
    scrollViewProps: PropTypes.object,
  };

  static defaultProps = {
    rtl: false,
    backgroundColor: 'white',
    borderColor: 'black',
    defaultItemSize: 50,
    underlayColor: 'transparent',
    defaultTitleStyle: { fontSize: 16 },
  };

  _getGroups() {
    let groupNumber = -1;
    let headers = [];
    let itemGroup = [];
    let result = [];
    let other = [];
    React.Children.forEach(this.props.children, child => {
      // Allow for null, optional fields
      if (!child) return;

      if (child.type.displayName === 'SettingsList.Header') {
        if (groupNumber != -1) {
          result[groupNumber] = {
            items: itemGroup,
            header: headers[groupNumber],
            other: other,
          };
          itemGroup = [];
          other = [];
        }
        groupNumber++;
        headers[groupNumber] = child.props;
      } else if (child.type.displayName === 'SettingsList.Item') {
        if (groupNumber == -1) {
          groupNumber++;
        }
        itemGroup.push(child.props);
      } else {
        if (groupNumber == -1) {
          groupNumber++;
        }
        other.push(child);
      }
    });
    result[groupNumber] = {
      items: itemGroup,
      header: headers[groupNumber],
      other: other,
    };
    return result;
  }

  render() {
    return (
      <ScrollView {...this.props.scrollViewProps}>
        {this._getGroups().map((group, index) => {
          return this._groupView(group, index);
        })}
      </ScrollView>
    );
  }

  _groupView(group, index) {
    if (group.header) {
      return (
        <View key={'group_' + index}>
          {group.other}
          <Text
            style={[{ margin: 5 }, group.header.headerStyle]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {group.header.headerText}
          </Text>
          <View
            style={{
              borderTopWidth: 2 / PixelRatio.get(),
              borderBottomWidth: 2 / PixelRatio.get(),
              borderColor: this.props.borderColor,
            }}
          >
            {group.items.map((item, index) => {
              return this._itemView(item, index, group.items.length);
            })}
          </View>
        </View>
      );
    } else {
      return (
        <View key={'group_' + index}>
          {group.other}
          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: this.props.borderColor,
            }}
          >
            {group.items.map((item, index) => {
              return this._itemView(item, index, group.items.length);
            })}
          </View>
        </View>
      );
    }
  }

  _itemEditableBlock(item, index, position) {
    return [
      <Text
        key={'itemTitle_' + index}
        style={[
          item.titleStyle ? item.titleStyle : this.props.defaultTitleStyle,
          position === 'Bottom'
            ? null
            : item.rtl
            ? styles.titleTextRTL
            : styles.titleText,
        ]}
      >
        {item.title}
      </Text>,
      item.isEditable ? (
        <TextInput
          key={item.id}
          style={
            item.editableTextStyle
              ? item.editableTextStyle
              : item.rtl
              ? item.editableTextRTL
              : item.editableText
          }
          placeholder={item.placeholder}
          onChangeText={text => item.onTextChange(text)}
          value={item.value}
        />
      ) : null,
    ];
  }

  _itemTitleBlock(item, index, position) {
    return [
      <Text
        key={'itemTitle_' + index}
        style={[
          item.titleStyle ? item.titleStyle : this.props.defaultTitleStyle,
          position === 'Bottom'
            ? null
            : item.rtl
            ? styles.titleTextRTL
            : styles.titleText,
        ]}
      >
        {item.title}
      </Text>,
      item.titleInfo ? (
        <Text
          key={'itemTitleInfo_' + index}
          style={[
            item.rightSideStyle
              ? item.rightSideStyle
              : position === 'Bottom'
              ? null
              : item.rtl
              ? styles.rightSideRTL
              : styles.rightSide,
            { color: '#B1B1B1' },
            item.titleInfoStyle,
          ]}
        >
          {item.titleInfo}
        </Text>
      ) : null,
    ];
  }

  _itemView(item, index, max) {
    let border;
    if (item.borderHide) {
      switch (item.borderHide) {
        case 'Top':
          border = {
            borderBottomWidth: 1,
            borderColor: this.props.borderColor,
          };
          break;
        case 'Bottom':
          border = { borderTopWidth: 1, borderColor: this.props.borderColor };
          break;
      }
    } else {
      border =
        index === max - 1
          ? { borderWidth: 0 }
          : { borderBottomWidth: 1, borderColor: this.props.borderColor };
    }

    let titleInfoPosition = item.titleInfoPosition
      ? item.titleInfoPosition
      : this.props.defaultTitleInfoPosition;

    return (
      <TouchableHighlight
        accessible={false}
        key={'item_' + index}
        underlayColor={
          item.underlayColor ? item.underlayColor : this.props.underlayColor
        }
        onPress={item.onPress}
        onLongPress={item.onLongPress}
      >
        <View
          style={
            item.itemBoxStyle
              ? item.itemBoxStyle
              : [
                  item.rtl ? styles.itemBoxRTL : styles.itemBox,
                  {
                    backgroundColor: item.backgroundColor
                      ? item.backgroundColor
                      : this.props.backgroundColor,
                  },
                ]
          }
        >
          {item.icon}
          {item.isAuth ? (
            <View
              style={
                item.titleBoxStyle
                  ? item.titleBoxStyle
                  : [item.rtl ? styles.titleBoxRTL : styles.titleBox, border]
              }
            >
              <View
                style={{ paddingLeft: 5, flexDirection: 'column', flex: 1 }}
              >
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: this.props.borderColor,
                  }}
                >
                  <TextInput
                    ref={input => (this.UserNameInputBlock = input)}
                    onSubmitEditing={() => this.PasswordInputBlock.focus()}
                    style={{
                      flex: 1,
                      height: 30,
                      borderBottomWidth: 1 / PixelRatio.get(),
                    }}
                    placeholder="username"
                    {...item.authPropsUser}
                  />
                </View>
                <View>
                  <TextInput
                    ref={input => (this.PasswordInputBlock = input)}
                    style={{ flex: 1, height: 30 }}
                    placeholder="password"
                    secureTextEntry={true}
                    returnKeyType={'go'}
                    {...item.authPropsPW}
                    onSubmitEditing={() => item.onPress()}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View
              style={
                item.titleBoxStyle
                  ? item.titleBoxStyle
                  : [
                      item.rtl ? styles.titleBoxRTL : styles.titleBox,
                      border,
                      {
                        minHeight: item.itemWidth
                          ? item.itemWidth
                          : this.props.defaultItemSize,
                      },
                    ]
              }
            >
              {titleInfoPosition === 'Bottom' ? (
                <View
                  style={{
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'center',
                  }}
                >
                  {item.isEditable
                    ? this._itemEditableBlock(item, index, 'Bottom')
                    : this._itemTitleBlock(item, index, 'Bottom')}
                </View>
              ) : item.isEditable ? (
                this._itemEditableBlock(item, index)
              ) : (
                this._itemTitleBlock(item, index)
              )}

              {item.rightSideContent ? item.rightSideContent : null}
              {item.hasSwitch ? (
                <Switch
                  {...item.switchProps}
                  style={item.rtl ? styles.rightSideRTL : styles.rightSide}
                  onValueChange={value => item.switchOnValueChange(value)}
                  value={item.switchState}
                />
              ) : null}
              {this.itemArrowIcon(item)}
            </View>
          )}
        </View>
      </TouchableHighlight>
    );
  }

  itemArrowIcon(item) {
    if (item.arrowIcon) {
      return item.arrowIcon;
    }

    if (item.hasNavArrow) {
      return (
        <Image
          style={[
            item.rtl ? styles.rightSideRTL : styles.rightSide,
            item.rtl ? styles.arrowRTL : styles.arrow,
            item.arrowStyle,
          ]}
          source={ARROW_ICON}
        />
      );
    }

    return null;
  }
}

/**
 * Optional Header for groups
 */
class Header extends React.Component {
  static displayName = 'SettingsList.Header';

  static propTypes = {
    rtl: PropTypes.bool,
    headerText: PropTypes.string,
    headerStyle: Text.propTypes.style,
  };

  static defaultProps = {
    rtl: false,
  };
  /**
   * not directly rendered
   */
  render() {
    return null;
  }
}
SettingsList.Header = Header;

/**
 * Individual Items in the Settings List
 */
class Item extends React.Component {
  static displayName = 'SettingsList.Item';

  static propTypes = {
    rtl: PropTypes.bool,
    /**
     * Title being displayed
     */
    title: PropTypes.string,
    titleStyle: Text.propTypes.style,
    /**
     * Icon displayed on the left of the settings item
     */
    icon: PropTypes.node,

    /**
     * Item Box Style
     */
    itemBoxStyle: ViewPropTypes.style,
    /**
     * Title Box Style
     */
    titleBoxStyle: ViewPropTypes.style,
    /**
     * Right Side Style
     */
    rightSideStyle: ViewPropTypes.style,
    /**
     * Editable Right Side Style
     */
    editableTextStyle: ViewPropTypes.style,

    /**
     * Individual item width.  Can be globally set in the parent.  Will become deprecated
     */
    itemWidth: PropTypes.number,
    /**
     * Allows for the item to become an auth item
     */
    isAuth: PropTypes.bool,
    authPropsUser: PropTypes.object,
    authPropsPW: PropTypes.object,
    /**
     * Individual background color. Can be globally set in the parent. Will become Deprecated
     */
    backgroundColor: PropTypes.string,

    /**
     * Individual underlay click color.  Can be globally set in the parent.
     */
    underlayColor: PropTypes.string,
    /**
     * Item on press callback.
     */
    onPress: PropTypes.func,
    /**
     * Item on long press callback.
     */
    onLongPress: PropTypes.func,
    /**
     * Enable or disable the > arrow at the end of the setting item.
     */
    hasNavArrow: PropTypes.bool,
    arrowIcon: PropTypes.node,

    arrowStyle: Image.propTypes.style,
    /**
     * Enable or disable a Switch component
     */
    hasSwitch: PropTypes.bool,
    /**
     * Switch state
     */
    switchState: PropTypes.bool,
    /**
     * Switch props
     */
    switchProps: PropTypes.object,
    /**
     * On value change callback
     */
    switchOnValueChange: PropTypes.func,
    /**
     * Right side information on the setting item
     */
    titleInfo: PropTypes.string,
    titleInfoStyle: Text.propTypes.style,
    /**
     * If 'Bottom', info is placed beneath the title
     */
    titleInfoPosition: PropTypes.string,
    /**
     * Right side content
     */
    rightSideContent: PropTypes.node,
    /* Gives opens to hide specific borders */
    borderHide: PropTypes.oneOf(['Top', 'Bottom', 'Both']),
  };

  static defaultProps = {
    rtl: false,
    hasNavArrow: true,
  };
  /**
   * not directly rendered
   */
  render() {
    return null;
  }
}
SettingsList.Item = Item;

const styles = StyleSheet.create({
  itemBox: {
    // flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  itemBoxRTL: {
    // flex: 1,
    justifyContent: 'center',
    flexDirection: 'row-reverse',
  },
  titleBox: {
    flex: 1,
    marginLeft: 15,
    flexDirection: 'row',
  },
  titleBoxRTL: {
    flex: 1,
    marginLeft: 15,
    flexDirection: 'row-reverse',
  },
  titleText: {
    flex: 1,
    alignSelf: 'center',
  },
  titleTextRTL: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'right',
  },
  rightSide: {
    marginRight: 15,
    alignSelf: 'center',
  },
  rightSideRTL: {
    marginLeft: 15,
    alignSelf: 'center',
  },
  editableText: {
    flex: 1,
    textAlign: 'right',
    marginRight: 15,
  },
  editableTextRTL: {
    flex: 1,
    textAlign: 'left',
    marginLeft: 15,
  },
  arrow: {},
  arrowRTL: {
    transform: [{ rotate: '180deg' }],
  },
});

module.exports = SettingsList;
