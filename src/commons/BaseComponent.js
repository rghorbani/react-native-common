/**
 * Copyright 2016 Reza (github.com/rghorbani)
 *
 * @flow
 */

const React = require('react');
const _ = require('lodash');
const { StyleSheet } = require('react-native');

const { BorderRadiuses, Colors, ThemeManager, Typography } = require('../style');

const FLEX_KEY_PATTERN = /^flex(G|S)?(-\d*)?$/;
const PADDING_KEY_PATTERN = /padding[LTRBHV]?-[0-9]*/;
const MARGIN_KEY_PATTERN = /margin[LTRBHV]?-[0-9]*/;
// const ALIGNMENT_KEY_PATTERN = /(left|top|right|bottom|center|centerV|centerH|spread)/;

class BaseComponent extends React.Component {
  static displayName = 'BaseComponent';

  constructor(props) {
    super(props);

    if (!this.styles) {
      this.generateStyles();
    }

    this.state = {
      ...this.extractStyleProps(),
    };
  }

  extractColorValue() {
    let color;
    _.forEach(Colors, (value, key) => {
      if (this.props[key] === true) {
        color = value;
      }
    });
    return color;
  }

  extractBackgroundColorValue() {
    let backgroundColor;
    _.forEach(Colors, (value, key) => {
      if (this.props[`background-${key}`] === true || this.props[`bg-${key}`] === true) {
        backgroundColor = value;
      }
    });
    return backgroundColor;
  }

  extractBorderRadiusValue() {
    let borderRadius;
    _.forEach(BorderRadiuses, (value, key) => {
      if (this.props[key] === true) {
        borderRadius = value;
      }
    });
    return borderRadius;
  }

  extractPaddingValues() {
    const PADDING_VARIATIONS = {
      padding: 'padding',
      paddingL: 'paddingLeft',
      paddingT: 'paddingTop',
      paddingR: 'paddingRight',
      paddingB: 'paddingBottom',
      paddingH: 'paddingHorizontal',
      paddingV: 'paddingVertical',
    };
    const paddings = {};
    const paddingPropsKeys = _.chain(this.props)
      .keys(this.props)
      .filter(key => PADDING_KEY_PATTERN.test(key))
      .value();

    _.forEach(paddingPropsKeys, (key) => {
      if (this.props[key] === true) {
        const [paddingKey, paddingValue] = key.split('-');
        const paddingVariation = PADDING_VARIATIONS[paddingKey];
        if (!isNaN(paddingValue)) {
          paddings[paddingVariation] = Number(paddingValue);
        }
      }
    });

    return paddings;
  }

  extractMarginValues() {
    const MARGIN_VARIATIONS = {
      margin: 'margin',
      marginL: 'marginLeft',
      marginT: 'marginTop',
      marginR: 'marginRight',
      marginB: 'marginBottom',
      marginH: 'marginHorizontal',
      marginV: 'marginVertical',
    };

    const margins = {};
    const marginPropsKeys = _.chain(this.props)
      .keys(this.props)
      .filter(key => MARGIN_KEY_PATTERN.test(key))
      .value();

    _.forEach(marginPropsKeys, (key) => {
      if (this.props[key] === true) {
        const [marginKey, marginValue] = key.split('-');
        const paddingVariation = MARGIN_VARIATIONS[marginKey];
        if (!isNaN(marginValue)) {
          margins[paddingVariation] = Number(marginValue);
        }
      }
    });

    return margins;
  }

  extractAlignmentsValues() {
    const {row, center} = this.props;
    const alignments = {};

    const alignmentRules = {};
    if (row) {
      alignments.flexDirection = 'row';
      alignmentRules.justifyContent = ['left', 'right', 'centerH', 'spread'];
      alignmentRules.alignItems = ['top', 'bottom', 'centerV'];
    } else {
      alignmentRules.justifyContent = ['top', 'bottom', 'centerV', 'spread'];
      alignmentRules.alignItems = ['left', 'right', 'centerH'];
    }

    _.forEach(alignmentRules, (positions, attribute) => {
      _.forEach(positions, (position) => {
        if (this.props[position]) {
          if (_.includes(['top', 'left'], position)) {
            alignments[attribute] = 'flex-start';
          } else if (_.includes(['bottom', 'right'], position)) {
            alignments[attribute] = 'flex-end';
          } else if (_.includes(['centerH', 'centerV'], position)) {
            alignments[attribute] = 'center';
          } else if (position === 'spread') {
            alignments[attribute] = 'space-between';
          }
        }
      });
    });

    if (center) {
      alignments.justifyContent = 'center';
      alignments.alignItems = 'center';
    }

    return alignments;
  }

  extractFlexStyle() {
    const STYLE_KEY_CONVERTERS = {
      flex: 'flex',
      flexG: 'flexGrow',
      flexS: 'flexShrink',
    };
    const flexPropKey = _.chain(this.props)
      .keys(this.props)
      .filter(key => FLEX_KEY_PATTERN.test(key))
      .last()
      .value();
    if (flexPropKey && this.props[flexPropKey] === true) {
      let [flexKey, flexValue] = flexPropKey.split('-');
      flexKey = STYLE_KEY_CONVERTERS[flexKey];
      flexValue = _.isEmpty(flexValue) ? 1 : Number(flexValue);

      return {[flexKey]: flexValue};
    }
  }

  extractStyleProps() {
    const backgroundColor = this.extractBackgroundColorValue();
    const borderRadius = this.extractBorderRadiusValue();
    const paddings = this.extractPaddingValues();
    const margins = this.extractMarginValues();
    const alignments = this.extractAlignmentsValues();
    const flexStyle = this.extractFlexStyle();

    return {
      backgroundColor,
      borderRadius,
      paddings,
      margins,
      alignments,
      flexStyle,
    };
  }

  extractTextProps(props) {
    return _.pick(props, [..._.keys(Typography), ..._.keys(Colors), 'color']);
  }

  extractTypographyValue() {
    const typographyPropsKeys = _.chain(this.props)
      .keys(this.props)
      .filter(key => Typography.getKeysPattern().test(key))
      .value();
    let typography;
    _.forEach(typographyPropsKeys, (key) => {
      if (this.props[key] === true) {
        typography = Typography[key];
      }
    });
    return typography;
  }

  generateStyles() {
    this.styles = StyleSheet.create({});
  }

  getThemeProps() {
    const componentName = this.constructor.displayName;
    const componentThemeProps = ThemeManager.components[componentName];
    return {...componentThemeProps, ...this.props};
  }
}

module.exports = BaseComponent;
