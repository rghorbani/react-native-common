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
const { Colors, Typography } = require('../../style');

/**
 * @description: TabBar.Item, inner component of TabBar for configuring the tabs
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
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {
      label,
      labelStyle,
      selected,
      selectedLabelStyle,
      onPress,
    } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={this.styles.container}
      >
        <View flex center>
          {!_.isEmpty(label) &&
            <Text
              style={[
                this.styles.label,
                labelStyle,
                selected && this.styles.labelSelected,
                selected && selectedLabelStyle,
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
  });
}

module.exports = TabBarItem;
