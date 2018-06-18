/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

'use strict';

const TabBar = require('../index');

describe('TabBar', () => {
  describe('calcIndicatorWidth', () => {
    it('should equale 25%', () => {
      const uut = new TabBar({});
      uut.state = {
        widths: [80, 80, 80, 80],
        selectedIndex: 1,
      };
      uut.childrenCount = 4;
      uut.contentWidth = 320;
      jest.spyOn(uut, 'calcIndicatorWidth');
      expect(uut.calcIndicatorWidth()).toEqual('25%');
    });

    it('should equale 50%', () => {
      const uut = new TabBar({});
      uut.state = {
        widths: [150, 150, 300],
        selectedIndex: 2,
      };
      uut.childrenCount = 2;
      uut.contentWidth = 600;
      jest.spyOn(uut, 'calcIndicatorWidth');
      expect(uut.calcIndicatorWidth()).toEqual('50%');
    });
  });
});
