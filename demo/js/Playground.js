
const React = require('react');
const autoBind = require('react-autobind');
const {
  StatusBar,
  StyleSheet,
  View,
} = require('react-native');
const {
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
