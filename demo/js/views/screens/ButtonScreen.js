
const React = require('react');
const autoBind = require('react-autobind');
const { ScrollView, View } = require('react-native');

class ButtonScreen extends React.Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  render() {
    return (
      <View />
    );
  }
}
