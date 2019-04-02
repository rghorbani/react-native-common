/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { PixelRatio, StyleSheet, View, ViewPropTypes } = require('react-native');

class ItemsWithSeparator extends React.Component {
  static displayName = 'ItemsWithSeparator';

  static propTypes = {
    style: ViewPropTypes.style,
    separatorStyle: ViewPropTypes.style,
    children: PropTypes.nodes,
  };

  render() {
    let children = [];
    let length = React.Children.count(this.props.children);
    React.Children.forEach(this.props.children, (child, ii) => {
      children.push(child);
      if (ii !== length - 1) {
        children.push(
          <View
            key={'separator-' + ii}
            style={[styles.separator, this.props.separatorStyle]}
          />,
        );
      }
    });
    return <View style={this.props.style}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#0322500A',
    height: 1 / PixelRatio.get(),
  },
});

module.exports = ItemsWithSeparator;
