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
import StyleSheet from '../other/StyleSheet';

class PageContainer extends React.Component {
  static propTypes = {
    rtl: PropTypes.bool,
    ...Header.propTypes,
    headerChildren: PropTypes.any,
    children: PropTypes.any,
    contentStyle: ViewPropTypes.style,
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    rtl: false,
  };

  constructor(props) {
    super(props);
  }

  render() {
    let {
      rtl,
      leftItems,
      rightItems,
      children,
      headerStyle,
      style,
      contentStyle,
      ...props
    } = this.props;

    if (rtl) {
      let tmp = leftItems;
      leftItems = rightItems;
      rightItems = tmp;
    }

    return (
      <View style={[styles.container, style]}>
        <View style={styles.headerWrapper}>
          <Header
            {...props}
            style={headerStyle}
            useSafeArea={false}
            leftItems={leftItems}
            rightItems={rightItems}
          >
            {this.props.headerChildren}
          </Header>
        </View>
        <View style={[styles.content, contentStyle]}>{children}</View>
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
