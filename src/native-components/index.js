/**
 * Copyright 2016 Reza (github.com/rghorbani).
 *
 * @flow
 */

'use strict';

module.exports = {
  get HighlighterOverlayView() { return require('./HighlighterOverlayView'); },
  get SafeAreaSpacerView() { return require('./safearea/SafeAreaSpacerView'); },
  get SafeAreaInsetsManager() { return require('./safearea/SafeAreaInsetsManager'); },
};
