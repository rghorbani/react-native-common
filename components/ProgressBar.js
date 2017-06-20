/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

var React = require('React');
// import LinearGradient from 'react-native-linear-gradient';
var {
  Image,
  Animated,
  LayoutAnimation,
  TouchableOpacity,
  StyleSheet,
  View,
} = require('react-native');
var { Text } = require('./RGFText');
var RGFColors = require('./RGFColors');

class ProgressView extends React.Component {
  props: {
    progress: number;
    style?: any;
  };

  constructor(props) {
    super(props);

    this.state = {
      anim: new Animated.Value(0),
      progress: 0,
      left: 1,
    };
  }

  componentDidMount() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    let progress = Math.floor(this.props.progress * 100);
    let left = 100 - progress;
    // console.log(progress, left);
    // setTimeout(function(){ this.setState({progress, left}) }.bind(this), 3000);
    this.setState({
      progress,
      left,
    });
    Animated.timing(this.state.anim, { toValue: 1, duration: 2000 }).start();
  }

  render() {
    let progress = Math.floor(this.props.progress * 100);
    let left = 100 - progress;
    // console.log(this.state.progress, this.state.left);
    return (
      <View style={[styles.container, this.props.style]}>
        <Animated.View style={{flex: this.state.progress, backgroundColor: this.props.color}} />
        <View style={{flex: this.state.left}} />
      </View>
    );
  }
}

const HEIGHT = 30;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT,
    flexDirection: 'row',
    backgroundColor: '#e7e7e7',
  },
});

module.exports = ProgressView;
