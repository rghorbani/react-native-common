/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const {
  ActivityIndicator,
  Animated,
  Image,
  StyleSheet,
  View,
} = require('react-native');
const { BaseComponent } = require('../../commons');

class AnimatedImage extends BaseComponent {
  static displayName = 'AnimatedImage';

  static propTypes = {
    ...Image.propTypes,
    /**
     * Additional spacing styles for the container
     */
    containerStyle: PropTypes.object,
    /**
     * Style for the image component
     */
    imageStyle: PropTypes.object,
    /**
     * The image source (external or assets)
     */
    source: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Duration for the fade animation when the image is loaded
     */
    animationDuration: PropTypes.number,
    /**
     * Use to identify the avatar in tests
     */
    testId: PropTypes.string,
    /**
     * A component to render while the image is loading
     */
    loader: PropTypes.element,
  };

  static defaultProps = {
    animationDuration: 300,
    loader: <ActivityIndicator />,
  };

  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(0),
      isLoading: true,
    };
  }

  onLoad() {
    this.setState({ isLoading: false }, () => {
      const animationParams = {
        toValue: 1,
        duration: this.props.animationDuration,
        useNativeDriver: false,
      };
      Animated.timing(this.state.opacity, animationParams).start();
    });

    this.props.onLoad && this.props.onLoad();
  }

  render() {
    const { testId, containerStyle, imageStyle, loader, ...props } = this.props;
    return (
      <View testID={testId} style={containerStyle}>
        <Animated.Image
          style={[{ opacity: this.state.opacity }, imageStyle]}
          {...props}
          onLoad={() => this.onLoad()}
        />
        {this.state.isLoading && loader && (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingInner}>{loader}</View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  loadingInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = AnimatedImage;
