/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { FlatList, SectionList, ViewPropTypes } = require('react-native');

class PureListView extends React.Component {
  static displayName = 'PureListView';

  static propTypes = {
    type: PropTypes.oneOf(['flat', 'section']).isRequired,
    data: PropTypes.array.isRequired,
    renderEmptyList: PropTypes.func,
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    type: 'flat',
    data: [],
    renderEmptyList: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.data !== nextProps.data) {
      this.setState({ data: nextProps.data });
    }
  }

  render() {
    const { renderEmptyList, ...props } = this.props;
    if (this.state.data.length === 0) {
      return renderEmptyList && renderEmptyList();
    }

    if (this.props.type === 'section') {
      return (
        <SectionList
          {...props}
          sections={this.state.data}
        />
      );
    }

    return (
      <FlatList
        {...props}
        data={this.state.data}
      />
    );
  }
}

module.exports = PureListView;
