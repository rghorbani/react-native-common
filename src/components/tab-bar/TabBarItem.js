/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const _ = require('lodash');
const { StyleSheet } = require('react-native');

const View = require('../view');
const Text = require('../text');
const { TouchableOpacity } = require('../touchables');
const { BaseComponent } = require('../../commons');
const { Constants } = require('../../helpers');
const { Colors, Spacings, Typography } = require('../../style');

/**
 * @description: TabBar.Item, inner component of TabBar for configuring the tabs
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabBarScreen.js
 */
class TabBarItem extends BaseComponent {
  static displayName = 'TabBar.Item';

  static propTypes = {
    /**
     * label of the tab
     */
    label: PropTypes.string,
    /**
     * custom label style
     */
    labelStyle: Text.propTypes.style,
    /**
     * maximun number of lines the label can break
     */
    maxLines: PropTypes.number,
    /**
     * custom selected tab label style
     */
    selectedLabelStyle: Text.propTypes.style,
    /**
     * whether the tab is selected or not
     */
    selected: PropTypes.bool,
    /**
     * callback for when pressing a tab
     */
    onPress: PropTypes.func,
    /**
     * whether the tab will have a divider on its right
     */
    showDivider: PropTypes.bool,
    /**
     * A fixed width for the item
     */
    width: PropTypes.number,
    /**
     * A callback to invoke for onLayout event
     */
    onLayout: PropTypes.func,
  };

  static defaultProps = {
    maxLines: 1,
  };

  constructor(props) {
    super(props);

    this.state = {
      fontStyle: this.getFontStyle(props),
    };
  }

  // HACK: for indicator width in TabBar
  getFontStyle(props) {
    return props.selectedLabelStyle || this.styles.labelSelected;
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  onLayout = (event) => {
    _.invoke(this.props, 'onLayout', event);
    // HACK: for indicator width in TabBar
    this.setState({fontStyle: {}});
  }

  render() {
    const {
      label,
      labelStyle,
      maxLines,
      selected,
      selectedLabelStyle,
      showDivider,
      width,
      onPress,
      testID,
    } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={width ? {width} : this.styles.container}
        testID={testID}
        onLayout={this.onLayout}
      >
        <View flex center style={[showDivider && this.styles.divider, {paddingHorizontal: Spacings.s4}]}>
          {!_.isEmpty(label) &&
            <Text
              numberOfLines={maxLines}
              style={[
                this.styles.label,
                labelStyle,
                selected && this.styles.labelSelected,
                selected && selectedLabelStyle,
                this.state.fontStyle, // HACK: for indicator width in TabBar
              ]}
            >
              {label}
            </Text>}
          {this.props.children}
        </View>
      </TouchableOpacity>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    label: {
      color: Colors.dark10,
      ...Typography.text90,
    },
    labelSelected: {
      color: Colors.blue30,
      fontWeight: Constants.isIOS ? '600' : '700',
    },
    divider: {
      borderRightWidth: 1,
      borderRightColor: Colors.dark70,
      marginVertical: 14, // NOTE: will not cut long text at the top and bottom in iOS if TabBar not height enough
    },
  });
}

module.exports = TabBarItem;
