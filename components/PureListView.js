/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const React = require('react');

const {
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
    type: 'flat',
    data: [],
    // renderSeparator: (sectionID, rowID) => <View style={styles.separator} key={rowID} />,
  };

  constructor(props: Props) {
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
