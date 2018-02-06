/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { View, ViewPropTypes } = require('react-native');

const Header = require('./header');
const StyleSheet = require('./StyleSheet');

// import type {Item as HeaderItem} from 'RGFHeader';

class PageContainer extends React.Component {
  static propTypes = {
    ...Header.propTypes,
    children: PropTypes.any,
    style: ViewPropTypes.style,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {children, ...props} = this.props;
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.headerWrapper}>
          <Header
            {...props}
          />
        </View>
        <View style={styles.content}>
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
      elevation: 2,
      backgroundColor: 'transparent',
      // FIXME: elevation doesn't seem to work without setting border
      borderRightWidth: 1,
      marginRight: -1,
      borderRightColor: 'transparent',
    }
  },
});

module.exports = PageContainer;
