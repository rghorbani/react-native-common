
const React = require('react');
const PropTypes = require('prop-types');
const { View, TextInput, StyleSheet } = require('react-native');
const BaseInput = require('./BaseInput');

class TextArea extends BaseInput {
  static displayName = 'TextArea';
  static propTypes = {
    ...TextInput.propTypes,
    ...BaseInput.propTypes,
    testId: PropTypes.string,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {value} = this.state;
    const typography = this.getTypography();
    const inputStyle = [this.styles.input, typography];
    return (
      <View style={this.styles.container}>
        <RNTextInput
          {...this.props}
          value={value}
          multiline={true}
          style={inputStyle}
          onChangeText={this.onChangeText}
          ref={(input) => { this.input = input; }}
        />
      </View>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    input: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      textAlignVertical: 'top',
    },
  });
}


module.exports = TextArea;
