/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

// const colors = {
//   red: 'rgb(255, 59, 48)',
//   orange: 'rgb(255, 149, 0)',
//   yellow: 'rgb(255, 204, 0)',
//   green: 'rgb(76, 217, 100)',
//   tealBlue: 'rgb(90, 200, 250)',
//   blue: 'rgb(0, 122, 255)',
//   purple: 'rgb(88, 86, 214)',
//   pink: 'rgb(255, 45, 85)',
// };

const TRANSACTION_TYPE_COLORS = {
  '1': '#3cc26b',
  '2': '#fb5959',
};

function colorForTransactionType(type: ?string): string {
  if (!type) {
    return '#2196F3';
  }

  let color = TRANSACTION_TYPE_COLORS[type.toString()];
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
    return '#3cc26b';
  }
}

function colorWithHSL(count: number, index: number): string {
  const hue = Math.round((360 * index) / (count + 1));
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
  colorWithHSL,
};
