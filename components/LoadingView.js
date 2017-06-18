
/**
 * Copyright 2016 Reza (github.com/rghorbani).
 *
 * @providesModule LoadingView
 * @flow
 */

'use strict';

var React = require('React');

var {
  ActivityIndicator,
  View,
  StyleSheet,
} = require('react-native');
var {
  RGFColors,
  Text,
} = require('RGFCommon');

class LoadingView extends React.Component {
  static defaultProps = {
    loading: false,
    type: 'secondary',
    caption: 'در حال دریافت اطلاعات ...',
  };

  render() {
    if (!this.props.loading) {
      return null;
    }

    if (this.props.type === 'primary') {
      return (
        <View style={[styles.container, styles.primary]}>
          <ActivityIndicator
            style={{transform: [{scale: 1.2}]}}
            color="#FFFFFF"
          />
          <Text style={[styles.title, styles.primaryTitle]}>
            {this.props.caption}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ActivityIndicator
          style={{transform: [{scale: 1.2}]}}
          color="black"
        />
        <Text style={styles.title}>
          {this.props.caption}
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  primary: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  title: {
    marginTop: 10,
    fontSize: 15,
    color: 'black',
  },
  primaryTitle: {
    color: '#FFFFFF',
  }
});

module.exports = LoadingView;
