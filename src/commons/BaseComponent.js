/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

const React = require('react');
const { StyleSheet } = require('react-native');

class BaseComponent extends React.Component {
  static displayName = 'BaseComponent';

  constructor(props) {
    super(props);

    if (!this.styles) {
      this.generateStyles();
    }
  }

  generateStyles() {
    this.styles = StyleSheet.create({});
  }
}

module.exports = BaseComponent;
