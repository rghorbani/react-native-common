const React = require('react');
const PropTypes = require('prop-types');
const _ = require('lodash');
const Animatable = require('react-native-animatable');
const { StyleSheet } = require('react-native');

const View = require('../view');
const Modal = require('../../screen-components/modal');
const { BaseComponent } = require('../../commons');
const { Colors } = require('../../style');

/*eslint-disable*/
/**
 * @description: Dialog component for displaying custom content inside a popup dialog
 * @notes: Use alignment modifiers to control the dialog positon (top, bottom, centerV, centerH, etc... by default the dialog is align to center)
 * @modifiers: alignment
 */
/*eslint-enable*/
class Dialog extends BaseComponent {
  static displayName = 'Dialog'

  static propTypes = {
    /**
     * Control visibility of the dialog
     */
    visible: PropTypes.bool,
    /**
     * dismiss callback for when clicking on the background
     */
    onDismiss: PropTypes.func,
    /**
     * The color of the overlay background
     */
    overlayBackgroundColor: PropTypes.string,
    /**
     * The dialog width (default: 90%)
     */
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * The dialog height (default: 70%)
     */
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * the animation configuration to pass to the dialog (based on react-native-animatable,
     * ex. {animation, duration, easing,..})
     */
    animationConfig: PropTypes.object,
    /**
     * The dialog container style
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  };

  static defaultProps = {
    overlayBackgroundColor: Colors.rgba(Colors.dark10, 0.6),
    width: '90%',
    height: '70%',
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getAnimationConfig() {
    const {animationConfig} = this.props;
    return {
      animation: 'slideInUp',
      duration: 400,
      useNativeDriver: true,
      ...animationConfig,
    };
  }

  render() {
    const {visible, overlayBackgroundColor, onDismiss} = this.getThemeProps();
    const {alignments} = this.state;
    const centerByDefault = _.isEmpty(alignments);

    return (
      <Modal
        transparent
        visible={visible}
        animationType={'fade'}
        onBackgroundPress={onDismiss}
        onRequestClose={onDismiss}
        overlayBackgroundColor={overlayBackgroundColor}
      >
        <View center={centerByDefault} style={[this.styles.overlay, alignments]} pointerEvents="box-none">
          <Animatable.View style={this.styles.dialogContainer} {...this.getAnimationConfig()}>
            {this.props.children}
          </Animatable.View>
        </View>
      </Modal>
    );
  }
}

function createStyles({width, height}) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
    },
    dialogContainer: {
      width,
      height,
    },
  });
}

module.exports = Dialog;
