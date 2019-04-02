/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

import React from 'react';
import ReactNative, { StyleSheet, Dimensions } from 'react-native';
import RGFColors from './RGFColors';

export function Text({ style, ...props }: Object): ReactElement {
  return <ReactNative.Text style={[styles.font, style]} {...props} />;
}

export function NumText({ style, ...props }: Object): ReactElement {
  return <ReactNative.Text style={[styles.numFont, style]} {...props} />;
}

export function Heading1({ style, ...props }: Object): ReactElement {
  return (
    <ReactNative.Text style={[styles.font, styles.h1, style]} {...props} />
  );
}

export function Paragraph({ style, ...props }: Object): ReactElement {
  return <ReactNative.Text style={[styles.font, styles.p, style]} {...props} />;
}

export function numberWithCommas(str) {
  if (str === undefined || str === '') {
    return '';
  }
  // TODO: Experiment
  // for (var i = 0; i < 10; i++) {
  //   x = x.replace(convertToPersian[i], i);
  // }
  let parts = str.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export function parseNumberWithCommas(str) {
  str = str.replace(/,/g, '');
  let pattern = /^\d+$/;
  if (!pattern.test(str)) {
    console.error('Error: parseNumberWithCommas', str);
    return '';
  }

  str = parseInt(str, 10);
  return str;
}

const scale = Dimensions.get('window').width / 375;

function normalize(size: number): number {
  return Math.round(scale * size);
}

const styles = StyleSheet.create({
  font: {
    // fontFamily: require('../env').textFont,
  },
  numFont: {
    // fontFamily: require('../env').digitFont,
  },
  h1: {
    fontSize: normalize(24),
    lineHeight: normalize(27),
    color: RGFColors.darkText,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  p: {
    fontSize: normalize(15),
    lineHeight: normalize(23),
    color: RGFColors.lightText,
  },
});
