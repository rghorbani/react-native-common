/**
 * Copyright 2016 Reza (github.com/rghorbani).
 *
 * @flow
 */

'use strict';

const React = require('react');
const { ActivityIndicator, Text, View, StyleSheet } = require('react-native');

class LoadingView extends React.Component {
  static displayName = 'LoadingView';

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
          <ActivityIndicator style={styles.indicator} color="#FFFFFF" />
          <Text
            style={[
              styles.caption,
              styles.primaryTitle,
              this.props.captionStyle,
            ]}
          >
            {this.props.caption}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ActivityIndicator style={styles.indicator} color="black" />
        <Text style={[styles.caption, this.props.captionStyle]}>
          {this.props.caption}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  indicator: {
    transform: [{ scale: 1.2 }],
  },
  primary: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  caption: {
    marginTop: 10,
    fontSize: 15,
    color: 'black',
  },
  primaryTitle: {
    color: '#FFFFFF',
  },
});

module.exports = LoadingView;
