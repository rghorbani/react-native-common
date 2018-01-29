/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { ViewPropTypes } = require('react-native');
const StyleSheet = require('./StyleSheet');
const ViewPager = require('./ViewPager');

class Carousel extends React.Component {
  static displayName = 'Carousel';

  static propTypes = {
    count: PropTypes.number,
    selectedIndex: PropTypes.number,
    onSelectedIndexChange: PropTypes.func,
    renderCard: PropTypes.func.isRequired,
    style: ViewPropTypes.style,
  };

  render() {
    let cards = [];
    const {count, selectedIndex, renderCard} = this.props;

    for (let i = 0; i < count; i++) {
      let content = null;
      if (Math.abs(i - selectedIndex) < 2) {
        content = renderCard(i);
      }
      cards.push(content);
    }
    return (
      <ViewPager style={styles.carousel} {...this.props} bounces={true}>
        {cards}
      </ViewPager>
    );
  }
}

const styles = StyleSheet.create({
  carousel: {
    ios: {
      margin: 10,
      overflow: 'visible',
      backgroundColor: 'transparent',
    },
  }
});

module.exports = Carousel;
