/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const {
  FlatList,
  SectionList,
  SwipeableFlatList,
  ViewPropTypes,
} = require('react-native');

class PureListView extends React.PureComponent {
  static displayName = 'PureListView';

  static propTypes = {
    type: PropTypes.oneOf(['FlatList', 'SectionList', 'SwipeableFlatList'])
      .isRequired,
    data: PropTypes.array.isRequired,
    renderEmptyList: PropTypes.func,
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    type: 'FlatList',
    data: [],
    renderEmptyList: null,
  };

  render() {
    const { renderEmptyList, type, ...props } = this.props;
    if (this.props.data.length === 0) {
      return renderEmptyList && renderEmptyList();
    }

    if (type === 'SectionList') {
      return <SectionList {...props} sections={this.props.data} />;
    } else if (type === 'SwipeableFlatList') {
      return <SwipeableFlatList {...props} />;
    }

    return <FlatList {...props} />;
  }
}

module.exports = PureListView;
