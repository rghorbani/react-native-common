/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

const React = require('react');
const _ = require('lodash');
const { StyleSheet } = require('react-native');
const { Colors, ThemeManager, Typography } = require('../style');

class BaseComponent extends React.Component {
  static displayName = 'BaseComponent';

  constructor(props) {
    super(props);

    if (!this.styles) {
      this.generateStyles();
    }
  }

  extractColorValue() {
    let color;
    _.forEach(Colors, (value, key) => {
      if (this.props[key] === true) {
        color = value;
      }
    });
    return color;
  }

  extractTypographyValue() {
    const typographyPropsKeys = _.chain(this.props)
      .keys(this.props)
      .filter(key => Typography.getKeysPattern().test(key))
      .value();
    let typography;
    _.forEach(typographyPropsKeys, (key) => {
      if (this.props[key] === true) {
        typography = Typography[key];
      }
    });
    return typography;
  }

  generateStyles() {
    this.styles = StyleSheet.create({});
  }
}

module.exports = BaseComponent;
