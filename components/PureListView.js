/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

var React = require('react');
var {
  FlatList,
  SectionList,
} = require('react-native');

export type Data = Array<Object>;
type RenderElement = () => ?ReactElement;

type Props = {
  type: 'flat' | 'section';
  data: Data;
  renderEmptyList?: ?RenderElement;
};

type State = {
  data: Data;
};

class PureListView extends React.Component {
  props: Props;
  state: State;

  static defaultProps = {
    data: [],
    // renderSeparator: (sectionID, rowID) => <View style={styles.separator} key={rowID} />,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      // data: this.props.type === 'flat' ? props.data : props.sections,
      data: props.data,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.data !== nextProps.data) {
      this.setState({ data: nextProps.data });
    }
  }

  render() {
    if (this.state.data.length === 0) {
      return this.props.renderEmptyList && this.props.renderEmptyList();
    }

    if (this.props.type === 'flat') {
      return (
        <FlatList
          {...this.props}
          data={this.state.data}
        />
      );
    }

    return (
      <SectionList
        {...this.props}
        sections={this.state.data}
      />
    );
  }
}

module.exports = PureListView;
