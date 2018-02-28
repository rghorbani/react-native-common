/**
 * Copyright 2016 Reza (github.com/rghorbani).
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const RNView = require('react-native').View;
const { StyleSheet, SafeAreaView, ViewPropTypes } = require('react-native');

const Constants = require('../../helpers/Constants');
const { BaseComponent } = require('../../commons');

class View extends BaseComponent {
  static displayName = 'View';

  static propTypes = {
    ...ViewPropTypes,
    ...BaseComponent.propTypes,
    /**
     * if true, will add SafeAreaView as a wrapper
     */
    useSafeArea: PropTypes.bool,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps); // eslint-disable-line
  }

  renderView() {
    const {backgroundColor, borderRadius, paddings, margins, alignments, flexStyle} = this.state;
    const {useSafeArea, style, left, top, right, bottom, flex: propsFlex, ...props} = this.props; // eslint-disable-line
    const Element = (useSafeArea && Constants.isIOS) ? SafeAreaView : RNView;

    return (
      <Element
        {...props}
        style={[
          this.styles.container,
          backgroundColor && {backgroundColor},
          borderRadius && {borderRadius},
          flexStyle,
          paddings,
          margins,
          alignments,
          style,
        ]}
        ref={r => (this.view = r)}
      >
        {this.props.children}
      </Element>
    );
  }

  render() {
    return this.renderView();
  }

  measure(...args) {
    this.view.measure(...args);
  }

  measureInWindow(...args) {
    this.view.measureInWindow(...args);
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {},
  });
}

module.exports = View;
