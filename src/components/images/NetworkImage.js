/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');

const AnimatedImage = require('./AnimatedImage');
const { BaseComponent } = require('../../commons');

class NetworkImage extends BaseComponent {
  static displayName = 'NetworkImage';

  static propTypes = {
    ...AnimatedImage.propTypes,
    /**
     * The fallback image source (external or assets)
     */
    fallbackSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  };

  constructor(props) {
    super(props);

    this.state = {
      error: false,
    };

    this.onError = this.onError.bind(this);
  }

  onError() {
    this.setState({ error: true });

    this.props.onError && this.props.onError();
  }

  render() {
    const { fallbackSource, source, ...props } = this.props;
    return (
      <AnimatedImage
        {...props}
        source={this.state.error ? fallbackSource : source}
        onError={this.onError}
      />
    );
  }
}

module.exports = NetworkImage;
