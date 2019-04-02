/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { StyleSheet, View, ViewPropTypes } = require('react-native');

class PageControl extends React.Component {
  static displayName = 'PageControl';

  static propTypes = {
    count: PropTypes.number.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    fullColor: PropTypes.string,
    emptyColor: PropTypes.string,
    size: PropTypes.number,
    style: ViewPropTypes.style,
  };

  render() {
    let images = [];
    for (let i = 0; i < this.props.count; i++) {
      const isSelected = this.props.selectedIndex === i;
      images.push(<Circle key={i} {...this.props} isSelected={isSelected} />);
    }
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.innerContainer}>{images}</View>
      </View>
    );
  }
}

class Circle extends React.Component {
  static displayName = 'PageControl.Circle';

  static propTypes = {
    fullColor: PropTypes.string,
    emptyColor: PropTypes.string,
    size: PropTypes.number,
  };

  render() {
    let extraStyle = {};
    if (this.props.isSelected) {
      extraStyle = this.props.fullColor
        ? { backgroundColor: this.props.fullColor }
        : styles.full;
    } else {
      extraStyle = this.props.emptyColor
        ? { backgroundColor: this.props.emptyColor }
        : styles.empty;
    }
    if (this.props.size) {
      extraStyle = {
        ...extraStyle,
        width: this.props.size,
        height: this.props.size,
        borderRadius: this.props.size / 2,
      };
    }
    return <View style={[styles.circle, extraStyle]} />;
  }
}

const CIRCLE_SIZE = 4;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
  },
  circle: {
    margin: 2,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  full: {
    backgroundColor: '#fff',
  },
  empty: {
    backgroundColor: '#fff5',
  },
});

module.exports = PageControl;
module.exports.__cards__ = define => {
  define('Simple 2', () => <PageControl count={2} selectedIndex={0} />);
  define('Simple 5', () => <PageControl count={5} selectedIndex={2} />);
};
