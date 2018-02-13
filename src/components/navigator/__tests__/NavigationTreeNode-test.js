/**
 * Copyright (c) 2015, Facebook, Inc.  All rights reserved.
 */

'use strict';

jest
  .unmock('NavigationTreeNode')
  .unmock('fbjs/lib/invariant')
  .unmock('immutable');

const NavigationTreeNode = require('NavigationTreeNode');

describe('NavigationTreeNode-test', () => {
  it('should be empty', () => {
    let node = new NavigationTreeNode();
    expect(node.getValue()).toEqual(undefined);
    expect(node.getParent()).toEqual(null);
    expect(node.getChildrenCount()).toEqual(0);
    expect(node.getChildAt(0)).toEqual(null);
  });


  it('should contain value', () => {
    let node = new NavigationTreeNode(123);
    expect(node.getValue()).toEqual(123);
  });

  it('should appendChild', () => {
    let papa = new NavigationTreeNode('hedger');
    let baby = new NavigationTreeNode('hedger jr');
    papa.appendChild(baby);
    expect(papa.getChildAt(0)).toEqual(baby);
    expect(papa.getChildrenCount()).toEqual(1);
    expect(baby.getParent()).toEqual(papa);
  });

  it('should removeChild', () => {
    let papa = new NavigationTreeNode('Eddard Stark');
    let baby = new NavigationTreeNode('Robb Stark');
    papa.appendChild(baby);

    papa.removeChild(baby);
    expect(papa.getChildAt(0)).toEqual(null);
    expect(papa.getChildrenCount()).toEqual(0);
    expect(baby.getParent()).toEqual(null);
  });

  it('should not remove non-child', () => {
    let papa = new NavigationTreeNode('dog');
    let baby = new NavigationTreeNode('cat');
    expect(papa.removeChild.bind(papa, baby)).toThrow();
  });

  it('should find child', () => {
    let papa = new NavigationTreeNode('Eddard Stark');
    let baby = new NavigationTreeNode('Robb Stark');

    papa.appendChild(baby);
    expect(papa.indexOf(baby)).toEqual(0);

    papa.removeChild(baby);
    expect(papa.indexOf(baby)).toEqual(-1);
  });


  it('should traverse each child', () => {
    let parent = new NavigationTreeNode();
    parent.appendChild(new NavigationTreeNode('a'));
    parent.appendChild(new NavigationTreeNode('b'));
    parent.appendChild(new NavigationTreeNode('c'));
    let result = [];
    parent.forEach((child, index) => {
      result[index] = child.getValue();
    });

    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should map children', () => {
    let parent = new NavigationTreeNode();
    parent.appendChild(new NavigationTreeNode('a'));
    parent.appendChild(new NavigationTreeNode('b'));
    parent.appendChild(new NavigationTreeNode('c'));
    let result = parent.map((child) => {
      return child.getValue();
    });

    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should traverse some children', () => {
    let parent = new NavigationTreeNode();
    parent.appendChild(new NavigationTreeNode('a'));
    parent.appendChild(new NavigationTreeNode('b'));
    parent.appendChild(new NavigationTreeNode('c'));

    let result = [];
    let value = parent.some((child, index) => {
      if (index > 1) {
        return true;
      } else {
        result[index] = child.getValue();
      }
    });

    expect(value).toEqual(true);
    expect(result).toEqual(['a', 'b']);
  });
});
