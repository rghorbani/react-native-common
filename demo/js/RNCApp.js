
const React = require('react');
const { StatusBar, View } = require('react-native');
const RNCNavigator = require('./RNCNavigator');

class RNCApp extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
        />
        <RNCNavigator />
      </View>
    );
  }
}

module.exports = RNCApp;
