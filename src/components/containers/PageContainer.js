/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { View, ViewPropTypes } = require('react-native');

const Header = require('../header');
const StyleSheet = require('../StyleSheet');

class PageContainer extends React.Component {
  static propTypes = {
    ...Header.propTypes,
    headerChildren: PropTypes.any,
    children: PropTypes.any,
    contentStyle: ViewPropTypes.style,
    style: ViewPropTypes.style,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {children, headerStyle, style, contentStyle, ...props} = this.props;
    return (
      <View style={[styles.container, style]}>
        <View style={styles.headerWrapper}>
          <Header
            {...props}
            style={headerStyle}
          >
            {this.props.headerChildren}
          </Header>
        </View>
        <View style={[styles.content, contentStyle]}>
          {children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  headerWrapper: {
    android: {
      backgroundColor: 'transparent',
    },
  },
});

module.exports = PageContainer;
