/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 * @providesModule InfiniteScrollView
 */
'use strict';

const React = require('react');

const { ScrollView, View } = require('react-native');

class InfiniteScrollView extends React.Component {
  constructor(props) {
    super(props);

    let fromIndex = this.fromIndex(props);
    let toIndex = this.toIndex(props);
    let index = this.index(props);

    this._scrollView = null;
    this.offscreenPages = this.props.offScreenPages || 1;
    this._renderedRange = {};

    this.state = {
      index: index,
      fromIndex: fromIndex,
      toIndex: toIndex,
      size: {
        width: 0,
        height: 0,
      },
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    let index = this.index(nextProps);
    let range = this.pagesRange(nextState);
    return (
      nextState.size !== this.state.size ||
      range.to !== this._renderedRange.to ||
      range.from !== this._renderedRange.from ||
      this.state.index !== index
    );
  }

  componentDidUpdate() {
    let scrollTo = { animated: false };
    if (this.props.horizontal) {
      scrollTo.x =
        (this.state.index - this._renderedRange.from) * this.state.size.width;
    } else {
      scrollTo.y =
        (this.state.index - this._renderedRange.from) * this.state.size.height;
    }
    this._scrollView.scrollTo(scrollTo);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.index !== nextProps.index) {
      this.setState({ index: nextProps.index });
    }
  }

  render() {
    let pages = null;
    if (this.state.size.width > 0 && this.state.size.width > 0) {
      let range = this.pagesRange(this.state);
      pages = this.renderContent(range);
    }

    return (
      <ScrollView
        directionalLockEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        {...this.props}
        ref={scrollView => {
          this._scrollView = scrollView;
        }}
        onLayout={e => this.onLayout(e)}
        pagingEnabled={true}
        onMomentumScrollEnd={e => this.onMomentumScrollEnd(e)}
      >
        {pages}
      </ScrollView>
    );
  }

  onLayout(event: any) {
    this.setState({
      size: {
        width: event.nativeEvent.layout.width,
        height: event.nativeEvent.layout.height,
      },
    });

    this.props.onLayout && this.props.onLayout(event);
  }

  onMomentumScrollEnd(event: any) {
    let scrollIndex = Math.round(
      this.props.horizontal
        ? event.nativeEvent.contentOffset.x / this.state.size.width
        : event.nativeEvent.contentOffset.y / this.state.size.height,
    );

    let currentIndex = this.state.index;
    let index =
      this.state.index +
      scrollIndex -
      Math.min(this.offscreenPages, this.state.index - this.state.fromIndex) -
      Math.max(0, this.offscreenPages + this.state.index - this.state.toIndex);

    if (index !== currentIndex && this.props.onPageIndexChange) {
      this.props.onPageIndexChange(index);
    }

    this.setState({ index: index });

    this.props.onMomentumScrollEnd && this.props.onMomentumScrollEnd(event);
  }

  pagesRange(state) {
    let range = {};
    range.from = Math.max(
      this.state.index - this.offscreenPages,
      state.fromIndex,
    );
    range.to = Math.min(range.from + 2 * this.offscreenPages, state.toIndex);
    range.from = Math.min(range.from, range.to - 2 * this.offscreenPages);
    return range;
  }

  renderContent(range): Array<ReactElement> {
    let pages = [];
    for (let i = range.from; i <= range.to; i++) {
      pages.push(this.renderPage(i));
    }
    this._renderedRange = range;
    return pages;
  }

  renderPage(index) {
    return (
      <View
        style={{ width: this.state.size.width, height: this.state.size.height }}
        key={index}
      >
        {this.props.renderPage(index)}
      </View>
    );
  }

  fromIndex(props) {
    if (!props) {
      props = this.props;
    }
    let fromIndex = Number.NEGATIVE_INFINITY;
    if (props.fromIndex % 1 === 0) {
      fromIndex = props.fromIndex;
    }
    return fromIndex;
  }

  toIndex(props) {
    if (!props) {
      props = this.props;
    }
    let toIndex = Number.POSITIVE_INFINITY;
    if (props.toIndex % 1 === 0) {
      toIndex = props.toIndex;
    }
    return toIndex;
  }

  index(props) {
    if (!props) {
      props = this.props;
    }
    let index = 0;
    if (props.index % 1 === 0) {
      index = Math.min(
        Math.max(props.index, this.fromIndex(props)),
        this.toIndex(props),
      );
    } else {
      index = Math.max(0, this.fromIndex(props));
    }
    return index;
  }
}

module.exports = InfiniteScrollView;
