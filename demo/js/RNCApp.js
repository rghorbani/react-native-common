
const React = require('react');
const { StatusBar, View } = require('react-native');
const RNCNavigator = require('./RNCNavigator');
const Playground = require('./Playground');

class RNCApp extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Playground />;
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
