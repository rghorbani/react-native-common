/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const _ = require('lodash');
const { ScrollView, StyleSheet } = require('react-native');

const presenter = require('./CarouselPresenter');
const View = require('../view');
const { BaseComponent } = require('../../commons');
const { Constants } = require('../../helpers');

const OFFSET_PIXEL_CORRECTION = 5;

/**
 * @description: Carousel for scrolling pages horizontally
 * @gif: https://media.giphy.com/media/l0HU7f8gjpRlMRhKw/giphy.gif, https://media.giphy.com/media/3oFzmcjX9OhpyckhcQ/giphy.gif
 */
class Carousel extends BaseComponent {
  static displayName = 'Carousel';

  static propTypes = {
    /**
     * this first page to start with
     */
    initialPage: PropTypes.number,
    /**
     * the page width (all pages should have the same page)
     */
    pageWidth: PropTypes.number,
    /**
     * if true, will have infinite scroll
     */
    loop: PropTypes.bool,
    /**
     * callback for when page has changed
     */
    onChangePage: PropTypes.func,
    /**
     * callback for onScroll event of the internall ScrollView
     */
    onScroll: PropTypes.func,
    /**
     * the carousel style
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  };

  static defaultProps = {
    initialPage: 0,
    pageWidth: Constants.screenWidth,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: props.initialPage,
      currentStandingPage: props.initialPage,
    };

    this.onScroll = this.onScroll.bind(this);
    this.updateOffset = this.updateOffset.bind(this);
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  get pageWidth() {
    return Math.floor(this.props.pageWidth);
  }

  onScroll(event) {
    const {loop} = this.props;
    const offsetX = event.nativeEvent.contentOffset.x;
    if (offsetX >= 0) {
      const {currentStandingPage} = this.state;
      const newPage = presenter.calcPageIndex(offsetX, this.props);

      this.setState({currentPage: newPage});

      // finished full page scroll
      if (offsetX % this.pageWidth <= OFFSET_PIXEL_CORRECTION) {
        this.setState({currentStandingPage: newPage});
        if (currentStandingPage !== newPage) {
          _.invoke(this.props, 'onChangePage', newPage, currentStandingPage);
        }
      }
    }

    if (loop && presenter.isOutOfBounds(offsetX, this.props)) {
      this.updateOffset();
    }

    _.invoke(this.props, 'onScroll', event);
  }

  updateOffset(animated = false) {
    const x = presenter.calcOffset(this.props, this.state);
    this.carousel && this.carousel.scrollTo({x, animated});
  }

  componentDidMount() {
    setTimeout(() => {
      this.updateOffset();
    }, 0);
  }

  cloneChild(child) {
    if (!child.key) {
      return child;
    }
    return React.cloneElement(child, {
      key: `${child.key}-clone`,
    });
  }

  renderChildren() {
    const {children, loop} = this.props;
    const length = presenter.getChildrenLength(this.props);

    const childrenArray = React.Children.toArray(children);
    if (loop) {
      childrenArray.unshift(this.cloneChild(children[length - 1]));
      childrenArray.push(this.cloneChild(children[0]));
    }

    return childrenArray;
  }

  render() {
    const {containerStyle, ...props} = this.props;
    return (
      <View flex style={containerStyle}>
        <ScrollView
          ref={(scrollView) => {
            this.carousel = scrollView;
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={this.onScroll}
          scrollEventThrottle={200}
          {...props}
        >
          {this.renderChildren()}
        </ScrollView>
      </View>
    );
  }

  goToPage(pageIndex, animated = true) {
    this.setState(
      {
        currentPage: pageIndex,
      },
      () => this.updateOffset(animated),
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    // container: {
    //   flex: 1,
    // },
  });
}

module.exports = Carousel;
