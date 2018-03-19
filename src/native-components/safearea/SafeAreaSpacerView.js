/**
 * Copyright 2016 Reza (github.com/rghorbani).
 *
 * @flow
 */

'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { View, requireNativeComponent } = require('react-native');

const NativeSafeAreaSpacerView = requireNativeComponent('SafeAreaSpacerView', null);

const SafeAreaSpacerView = ({style}) => {
  return (
    NativeSafeAreaSpacerView ? <NativeSafeAreaSpacerView style={style}/> : <View style={style}/>
  );
};
SafeAreaSpacerView.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
};

module.exports = SafeAreaSpacerView;
