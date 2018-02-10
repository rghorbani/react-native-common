/**
 * Copyright 2016 Reza (github.com/rghorbani).
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { ActivityIndicator, StyleSheet } = require('react-native');

const Text = require('../text');
const View = require('../view');
const { Constants } = require('../../helpers');
const { Colors, Typography, ThemeManager } = require('../../style');

class LoadingView extends React.Component {
  static displayName = 'LoadingView';

  static propTypes = {
    ...ActivityIndicator.propTypes,
    /**
    * Show the screen as an overlay
    */
    overlay: PropTypes.bool,
    /**
     * is loading
     */
    loading: PropTypes.bool,
    /**
     * loading caption
     */
    caption: PropTypes.string,
    /**
     * caption style
     */
    captionStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  };

  static defaultProps = {
    overlay: false,
    loading: true,
    color: Constants.isIOS ? Colors.dark60 : ThemeManager.primaryColor,
    caption: 'Loading...',
  };

  render() {
    const {overlay, loading, caption, captionStyle, style, ...props} = this.props;

    if (!this.props.loading) {
      return null;
    }

    return (
      <View style={[overlay ? styles.overlayContainer : styles.container, styles.containerCommon]}>
        <ActivityIndicator
          style={[styles.indicator, style]}
          {...props}
        />
        {caption && <Text style={[styles.caption, captionStyle]}>{caption}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.rgba(Colors.white, 0.85),
    zIndex: 100,
  },
  containerCommon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  indicator: {
    transform: [{scale: 1.5}],
  },
  caption: {
    marginTop: 15,
    ...Typography.text70,
    color: Colors.dark10,
  },
});

module.exports = LoadingView;
