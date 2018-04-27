const React = require('react');
const PropTypes = require('prop-types');

class WheelPickerItem extends React.Component {
  // eslint-disable-line react/no-multi-comp
  static propTypes = {
    /**
     * the picker item value
     */
    value: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * the picker item display label
     */
    label: PropTypes.string,
  };

  render() {
    // These items don't get rendered directly.
    return null;
  }
}

module.exports = WheelPickerItem;
