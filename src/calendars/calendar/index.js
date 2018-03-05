const React = require('react');
const PropTypes = require('prop-types');
const { StyleSheet, View, ViewPropTypes } = require('react-native');

const Moment = require('moment');
const dateutils = require('../dateutils');
const { xdateToData, parseDate } = require('../interface');
const Day = require('./day/basic');
const UnitDay = require('./day/period');
const MultiDotDay = require('./day/multi-dot');
const CalendarHeader = require('./header');
const shouldComponentUpdate = require('./updater');
const defaultStyle = require('../style');

//Fallback when RN version is < 0.44
const viewPropTypes = ViewPropTypes || View.propTypes;

const EmptyArray = [];

class Calendar extends React.Component {
  static propTypes = {
    // Specify theme properties to override specific styles for calendar parts. Default = {}
    theme: PropTypes.object,
    // Collection of dates that have to be marked. Default = {}
    markedDates: PropTypes.object,

    // Specify style for calendar container element. Default = {}
    style: viewPropTypes.style,
    // Initially visible month. Default = Date()
    current: PropTypes.any,
    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
    minDate: PropTypes.any,
    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
    maxDate: PropTypes.any,

    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
    firstDay: PropTypes.number,

    // Date marking style [simple/period]. Default = 'simple'
    markingType: PropTypes.string,

    // Hide month navigation arrows. Default = false
    hideArrows: PropTypes.bool,
    // Display loading indicador. Default = false
    displayLoadingIndicator: PropTypes.bool,
    // Do not show days of other months in month page. Default = false
    hideExtraDays: PropTypes.bool,

    // Handler which gets executed on day press. Default = undefined
    onDayPress: PropTypes.func,
    // Handler which gets executed when visible month changes in calendar. Default = undefined
    onMonthChange: PropTypes.func,
    onVisibleMonthsChange: PropTypes.func,
    // Replace default arrows with custom ones (direction can be 'left' or 'right')
    renderArrow: PropTypes.func,
    // Provide custom day rendering component
    dayComponent: PropTypes.any,
    // Month format in calendar title. Formatting values: https://momentjs.com/docs/#/displaying/format/
    monthFormat: PropTypes.string,
    // Disables changing month when click on days of other months (when hideExtraDays is false). Default = false
    disableMonthChange: PropTypes.bool,
    //  Hide day names. Default = false
    hideDayNames: PropTypes.bool,
    // Disable days by default. Default = false
    disabledByDefault: PropTypes.bool,
    // Show week numbers. Default = false
    showWeekNumbers: PropTypes.bool,
    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
    onPressArrowLeft: PropTypes.func,
    // Handler which gets executed when press arrow icon left. It receive a callback can go next month
    onPressArrowRight: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.style = styleConstructor(this.props.theme);
    let currentMonth;
    if (props.current) {
      currentMonth = parseDate(props.current);
    } else {
      currentMonth = Moment.utc();
    }
    this.state = {
      currentMonth
    };

    this.updateMonth = this.updateMonth.bind(this);
    this.addMonth = this.addMonth.bind(this);
    this.pressDay = this.pressDay.bind(this);
    this.shouldComponentUpdate = shouldComponentUpdate;
  }

  componentWillReceiveProps(nextProps) {
    const current = parseDate(nextProps.current);
    if (current && current.format('YYYY MM') !== this.state.currentMonth.format('YYYY MM')) {
      this.setState({
        currentMonth: current.clone()
      });
    }
  }

  updateMonth(day, doNotTriggerListeners) {
    if (day.format('YYYY MM') === this.state.currentMonth.format('YYYY MM')) {
      return;
    }
    this.setState({
      currentMonth: day.clone()
    }, () => {
      if (!doNotTriggerListeners) {
        const currMont = this.state.currentMonth.clone();
        if (this.props.onMonthChange) {
          this.props.onMonthChange(xdateToData(currMont));
        }
        if (this.props.onVisibleMonthsChange) {
          this.props.onVisibleMonthsChange([xdateToData(currMont)]);
        }
      }
    });
  }

  pressDay(date) {
    const day = parseDate(date);
    const minDate = parseDate(this.props.minDate);
    const maxDate = parseDate(this.props.maxDate);
    if (!(minDate && !dateutils.isGTE(day, minDate)) && !(maxDate && !dateutils.isLTE(day, maxDate))) {
      const shouldUpdateMonth = this.props.disableMonthChange === undefined || !this.props.disableMonthChange;
      if (shouldUpdateMonth) {
        this.updateMonth(day);
      }
      if (this.props.onDayPress) {
        this.props.onDayPress(xdateToData(day));
      }
    }
  }

  addMonth(count) {
    this.updateMonth(this.state.currentMonth.clone().add(count, 'months'));
  }

  renderDay(day, id) {
    const minDate = parseDate(this.props.minDate);
    const maxDate = parseDate(this.props.maxDate);
    let state = '';
    if (this.props.disabledByDefault) {
      state = 'disabled';
    } else if ((minDate && !dateutils.isGTE(day, minDate)) || (maxDate && !dateutils.isLTE(day, maxDate))) {
      state = 'disabled';
    } else if (!dateutils.sameMonth(day, this.state.currentMonth)) {
      state = 'disabled';
    } else if (dateutils.sameDate(day, Moment())) {
      state = 'today';
    }
    let dayComp;
    if (!dateutils.sameMonth(day, this.state.currentMonth) && this.props.hideExtraDays) {
      if (this.props.markingType === 'period') {
        dayComp = (<View key={id} style={{flex: 1}}/>);
      } else {
        dayComp = (<View key={id} style={{width: 32}}/>);
      }
    } else {
      const DayComp = this.getDayComponent();
      const date = day.date();
      dayComp = (
        <DayComp
          key={id}
          state={state}
          theme={this.props.theme}
          onPress={this.pressDay}
          date={xdateToData(day)}
          marking={this.getDateMarking(day)}
        >
          {date}
        </DayComp>
      );
    }
    return dayComp;
  }

  getDayComponent() {
    if (this.props.dayComponent) {
      return this.props.dayComponent;
    }

    switch (this.props.markingType) {
    case 'period':
      return UnitDay;
    case 'multi-dot':
      return MultiDotDay;
    default:
      return Day;
    }
  }

  getDateMarking(day) {
    if (!this.props.markedDates) {
      return false;
    }
    const dates = this.props.markedDates[day.format('YYYY-MM-DD')] || EmptyArray;
    if (dates.length || dates) {
      return dates;
    } else {
      return false;
    }
  }

  renderWeekNumber (weekNumber) {
    return <Day key={`week-${weekNumber}`} theme={this.props.theme} state="disabled">{weekNumber}</Day>;
  }

  renderWeek(days, id) {
    const week = [];
    days.forEach((day, id2) => {
      week.push(this.renderDay(day, id2));
    }, this);

    if (this.props.showWeekNumbers) {
      week.unshift(this.renderWeekNumber(days[days.length - 1].isoWeek()));
    }

    return (<View style={this.style.week} key={id}>{week}</View>);
  }

  render() {
    const days = dateutils.page(this.state.currentMonth, this.props.firstDay);
    const weeks = [];
    while (days.length) {
      weeks.push(this.renderWeek(days.splice(0, 7), weeks.length));
    }
    let indicator;
    const current = parseDate(this.props.current);
    if (current) {
      const lastMonthOfDay = current.clone().add(1, 'months').date(1).add(-1, 'days').format('YYYY-MM-DD');
      if (this.props.displayLoadingIndicator &&
          !(this.props.markedDates && this.props.markedDates[lastMonthOfDay])) {
        indicator = true;
      }
    }
    return (
      <View style={[this.style.container, this.props.style]}>
        <CalendarHeader
          theme={this.props.theme}
          hideArrows={this.props.hideArrows}
          month={this.state.currentMonth}
          addMonth={this.addMonth}
          showIndicator={indicator}
          firstDay={this.props.firstDay}
          renderArrow={this.props.renderArrow}
          monthFormat={this.props.monthFormat}
          hideDayNames={this.props.hideDayNames}
          weekNumbers={this.props.showWeekNumbers}
          onPressArrowLeft={this.props.onPressArrowLeft}
          onPressArrowRight={this.props.onPressArrowRight}
        />
        {weeks}
      </View>);
  }
}

const STYLESHEET_ID = 'stylesheet.calendar.main';

function styleConstructor(theme = {}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    container: {
      paddingLeft: 5,
      paddingRight: 5,
      backgroundColor: appStyle.calendarBackground
    },
    week: {
      marginTop: 7,
      marginBottom: 7,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}

module.exports = Calendar;
