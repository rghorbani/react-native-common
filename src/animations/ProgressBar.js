/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');

const View = require('../components/view');
const AnimatedScanner = require('./AnimatedScanner');
const { BaseComponent } = require('../commons');
const { Colors } = require('../style');

/**
 * @description: Animated progress bar
 */
class ProgressBar extends BaseComponent {
  static displayName = 'ProgressBar';

  static propTypes = {
    ...AnimatedScanner.propTypes,
    /**
     * height of the progress bar
     */
    height: PropTypes.number,
    /**
     * background color of the component
     */
    backgroundColor: PropTypes.string,
    /**
     * the progress background color
     */
    progressBackgroundColor: PropTypes.string,
  };

  static defaultProps = {
    backgroundColor: Colors.dark60,
    progressBackgroundColor: Colors.dark10,
  };

  render() {
    const {height, backgroundColor, progressBackgroundColor} = this.props;
    const animatedScannerProps = AnimatedScanner.extractOwnProps(this.props);
    const modifiers = this.extractModifierProps();

    return (
      <View height={height} {...modifiers} style={{backgroundColor}}>
        <AnimatedScanner {...animatedScannerProps} backgroundColor={progressBackgroundColor} hideScannerLine/>
      </View>
    );
  }
}

module.exports = ProgressBar;
