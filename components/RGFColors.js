/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @providesModule RGFColors
 * @flow
 */

'use strict';

const LOCATION_COLORS = {
  'HERBST': '#00E3AD',
  'HERBST A': '#00E3AD',
  'HERBST B': '#00E3AD',
  'HACKER X': '#4D99EF',
  'HACKER Y': '#CF72B1',
  'COWELL': '#6A6AD5',
  'COWELL C': '#6A6AD5',
  'FOOD TENT': '#FFCD3B',
};

const TRANSACTION_TYPE_COLORS = {
  '1': '#3cc26b',
  '2': '#fb5959',
};

function colorForTransactionType(type: ?string): string {
  if (!type) {
    return '#2196F3';
  }

  var color = TRANSACTION_TYPE_COLORS[type.toString()];
  if (!color) {
    console.warn(`Transaction type '${type}' has no color`);
    color = '#2196F3';
  }
  return color;
}

function colorForAmount(amount: ?number): string {
  if (!amount) {
    return '#2196F3';
  }

  if (amount < 0) {
    return '#fb5959';
  } else {
    return '#3cc26b'
  }
}

function colorForTopic(count: number, index: number): string {
  const hue = Math.round(360 * index / (count + 1));
  return `hsl(${hue}, 74%, 65%)`;
}

module.exports = {
  primary: '#32b189',
  tintColor: '#2db58c',
  red: '#fb5959',
  green: '#3cc26b',
  headerBackground: '#32b189',
  actionText: '#3FB4CF',
  inactiveText: '#9B9B9B',
  darkText: '#032250',
  mediumText: '#555555',
  lightText: '#7F91A7',
  cellBorder: '#EEEEEE',
  darkBackground: '#183E63',
  inputUnderlineActive: 'green',
  inputUnderline: '#9B9B9B',
  divider: '#e2e3e5',
  colorForTransactionType,
  colorForAmount,
  colorForTopic,
};
