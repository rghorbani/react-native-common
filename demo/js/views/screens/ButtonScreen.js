
const React = require('react');
const autoBind = require('react-autobind');
const { ScrollView, StyleSheet, View } = require('react-native');

class ButtonScreen extends React.Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  render() {
    return (
      <View style={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  }
});

module.exports = ButtonScreen;
