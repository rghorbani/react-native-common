
var React = require('React');

var {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewPagerAndroid,
} = require('react-native');

class InfiniteScrollView extends React.Component {
  constructor(props) {
    super(props);

    let fromIndex =this.fromIndex(props);
    let toIndex = this.toIndex(props);
    let index = this.realIndex(props);

    // this.scrollview = null;
    this.offscreenPages = this.props.offScreenPages || 1;
    this.renderedRange = {};
    this.state = {
      initialSelectedIndex: this.props.selectedIndex,
      index: index,
      fromIndex: fromIndex,
      toIndex: toIndex,
      width: 0,
      height: 0,
      size: {
        width: 0,
        height: 0,
      }
    };

    (this: any).adjustCardSize = this.adjustCardSize.bind(this);
    (this: any).renderContent = this.renderContent.bind(this);
    (this: any).handleHorizontalScroll = this.handleHorizontalScroll.bind(this);
    (this: any).renderPage = this.renderPage.bind(this);
    (this: any).pagesRange = this.pagesRange.bind(this);
    (this: any).fromIndex = this.fromIndex.bind(this);
    (this: any).toIndex = this.toIndex.bind(this);
    (this: any).realIndex = this.realIndex.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let index = this.realIndex(nextProps);
    let range = this.pagesRange(nextState);
    return (
      nextState.size !== this.state.size ||
      range.to !== this.renderedRange.to || range.from !== this.renderedRange.from ||
      this.state.index !== index
    );
  }

  componentDidUpdate() {
    let scrollTo = {animated: false}
    scrollTo.x = (this.state.index - this.renderedRange.from) * this.state.width;
    console.log(scrollTo);
    this.refs.scrollview.scrollTo(scrollTo);
  }

  // render() {
  //   if (Platform.OS === 'ios') {
  //     return this.renderIOS();
  //   } else {
  //     return this.renderAndroid();
  //   }
  // }

  render() {
    return (
      <ScrollView
        ref="scrollview"
        contentOffset={{
          x: this.state.width * this.state.index,
          y: 0,
        }}
        style={[styles.scrollview, this.props.style]}
        horizontal={true}
        pagingEnabled={true}
        bounces={!!this.props.bounces}
        scrollsToTop={false}
        onScroll={this.handleHorizontalScroll}
        scrollEventThrottle={100}
        removeClippedSubviews={true}
        automaticallyAdjustContentInsets={false}
        directionalLockEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onLayout={this.adjustCardSize}>
        {this.renderContent()}
      </ScrollView>
    );
  }
  // ref={(scrollView) => {this.scrollview = scrollView}}
  // onMomentumScrollEnd={(e) => this.onMomentumScrollEnd(e)}>

  renderAndroid() {
    return (
      <ViewPagerAndroid
        ref="scrollview"
        initialPage={this.state.initialSelectedIndex}
        onPageSelected={this.handleHorizontalScroll}
        style={styles.container}>
        {this.renderContent()}
      </ViewPagerAndroid>
    );
  }

  adjustCardSize(e: any) {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
      size: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height,
      },
    });

    this.props.onLayout && this.props.onLayout(e);
  }

  renderContent(): Array<ReactElement> {
    let pages = null;
    if(this.state.width > 0 && this.state.width > 0) {
      let range = this.pagesRange(this.state);
      pages = this.createPages(range);
    }
    return pages;
    // var {width, height} = this.state;
    // var style = Platform.OS === 'ios' && styles.card;
    // return React.Children.map(this.props.children, (child, i) => (
    //   <View style={[style, {width, height}]} key={'r_' + i}>
    //     {child}
    //   </View>
    // ));
  }

  handleHorizontalScroll(e: any) {
    let scrollIndex = Math.round(e.nativeEvent.contentOffset.x / this.state.width);
    let currentIndex = this.realIndex();

    let index = currentIndex + scrollIndex - Math.min(this.offscreenPages, currentIndex - this.fromIndex()) - Math.max(0, this.offscreenPages + currentIndex - this.toIndex());

    if(index !== currentIndex && this.props.onPageIndexChange) {
      this.props.onPageIndexChange(index);
    }

    this.setState({ index });
    // var selectedIndex = e.nativeEvent.position;
    // if (selectedIndex === undefined) {
    //   selectedIndex = Math.round(
    //     e.nativeEvent.contentOffset.x / this.state.width,
    //   );
    // }
    // if (selectedIndex < 0 || selectedIndex >= this.props.count) {
    //   return;
    // }
    // if (this.state.scrollingTo !== null && this.state.scrollingTo !== selectedIndex) {
    //   return;
    // }
    // if (this.props.selectedIndex !== selectedIndex || this.state.scrollingTo !== null) {
    //   this.setState({selectedIndex, scrollingTo: null});
    //   const {onSelectedIndexChange} = this.props;
    //   onSelectedIndexChange && onSelectedIndexChange(selectedIndex);
    // }
  }

  pagesRange(state) {
    let range = {};
    range.from = Math.max(state.index - this.offscreenPages, state.fromIndex);
    range.to = Math.min(range.from + 2 * this.offscreenPages, state.toIndex);
    range.from = Math.min(range.from, range.to - 2 * this.offscreenPages);
    return range;
  }

  createPages(range) {
    let pages = [];
    for(var i = range.from; i <= range.to; i++) {
      pages.push(this.renderPage(i));
    }
    this.renderedRange = range;
    return pages;
  }

  renderPage(index) {
    let {width, height} = this.state;
    return (
      <View style={{width, height}} key={'p_' + index}>
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

  realIndex(props) {
    if(!props) props = this.props;
    let index = 0;
    if (props.index % 1 === 0)
      index = Math.min(Math.max(props.index, this.fromIndex(props)), this.toIndex(props));
    else
      index = Math.max(0, this.fromIndex(props));
    return index;
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: 'transparent',
  }
});

module.exports = InfiniteScrollView;
