
const React = require('react');
const autoBind = require('react-autobind');
const {
  StatusBar,
  StyleSheet,
  Text,
  View,
} = require('react-native');
const {
  Button,
  TextInput,
} = require('react-native-common');

class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    autoBind(this);
  }

  render() {
    console.log(TextInput);
    return (
      <View style={styles.container}>
        <StatusBar
        />
        <View style={styles.container}>
          <TextInput
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = Playground;
