/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const _ = require('lodash');
const { NetInfo, StyleSheet, Text, ViewPropTypes } = require('react-native');

const View = require('../view');
const { Constants } = require('../../helpers');
const { BaseComponent } = require('../../commons');
const { Colors, Typography } = require('../../style');
const { TouchableOpacity } = require('../touchables');

class ConnectionStatusBar extends BaseComponent {
  static displayName = 'ConnectionStatusBar';

  static propTypes = {
    /**
     * Container style
     */
    rtl: PropTypes.bool,
    /**
     * Container style
     */
    containerStyle: ViewPropTypes.style,
    /**
     * Text to show as the status
     */
    label: PropTypes.string,
    /**
     * Text to show as the status
     */
    labelStyle: Text.propTypes.style,
    /**
     * Handler to get connection change events propagation
     */
    onConnectionChange: PropTypes.func,
    /**
     * Text to show as the status
     */
    allowDismiss: PropTypes.bool,
  };

  static defaultProps = {
    rtl: false,
    label: 'No internet. Check your connection.',
    allowDismiss: false,
  };

  static onConnectionLost;
  static registerGlobalOnConnectionLost(callback) {
    ConnectionStatusBar.onConnectionLost = callback;
  }

  static unregisterGlobalOnConnectionLost() {
    delete ConnectionStatusBar.onConnectionLost;
  }

  constructor(props) {
    super(props);

    this.state = {
      isConnected: true,
      isCancelled: false,
    };

    this.onConnectionChange = this.onConnectionChange.bind(this);

    this.getInitialConnectionState();
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  componentDidMount() {
    this.netInfoListener = NetInfo.addEventListener(
      'connectionChange',
      this.onConnectionChange,
    );
  }

  componentWillUnmount() {
    if (this.netInfoListener) {
      this.netInfoListener.remove();
    }
  }

  onConnectionChange(state) {
    const isConnected = this.isStateConnected(state);
    if (isConnected !== this.state.isConnected) {
      this.setState({
        isConnected,
        isCancelled: false,
      });
      this.props.onConnectionChange &&
        this.props.onConnectionChange(isConnected, false);

      if (!isConnected) {
        setTimeout(() => {
          this.getInitialConnectionState();
        }, 3000);
      }

      if (!isConnected && _.isFunction(ConnectionStatusBar.onConnectionLost)) {
        ConnectionStatusBar.onConnectionLost();
      }
    }
  }

  async getInitialConnectionState() {
    const state = await NetInfo.getConnectionInfo();
    const isConnected = this.isStateConnected(state);
    this.setState({ isConnected });
    this.props.onConnectionChange &&
      this.props.onConnectionChange(isConnected, true);
  }

  isStateConnected(state) {
    const lowerCaseState = _.lowerCase(state.type);
    const isConnected = lowerCaseState !== 'none';
    return isConnected;
  }

  render() {
    if (this.state.isConnected || this.state.isCancelled) {
      return false;
    }

    return (
      <View
        useSafeArea
        style={[this.styles.absoluteContainer, this.props.containerStyle]}
      >
        <View style={this.styles.container}>
          <View style={this.styles.innerContainer}>
            <Text style={[this.styles.text, this.props.labelStyle]}>
              {this.props.label}
            </Text>
            {this.props.allowDismiss && (
              <TouchableOpacity
                style={this.styles.xContainer}
                onPress={() => this.setState({ isCancelled: true })}
              >
                <Text style={this.styles.x}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}

function createStyles({ rtl }) {
  const typography = Constants.isSmallScreen
    ? Typography.text90
    : Typography.text80;
  return StyleSheet.create({
    absoluteContainer: {
      backgroundColor: Colors.dark30,
      ...StyleSheet.absoluteFillObject,
      bottom: undefined,
    },
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    innerContainer: {
      flex: 1,
      flexDirection: rtl ? 'row-reverse' : 'row',
    },
    text: {
      flex: 1,
      ...typography,
      textAlign: 'center',
      color: Colors.dark60,
      marginTop: 8,
      marginBottom: 8,
      alignSelf: 'center',
    },
    xContainer: {
      paddingLeft: 10,
      paddingRight: 10,
      alignSelf: 'center',
    },
    x: {
      fontSize: Typography.text80.fontSize,
      color: Colors.black,
    },
  });
}

module.exports = ConnectionStatusBar;
