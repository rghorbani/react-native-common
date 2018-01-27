
const React = require('react');
// const Navigator = require('react-native-de');
const RNCTabsView = require('./views/RNCTabsView');

class RNCNavigator extends React.Component {
  constructor(props) {
    super(props);

    this._handlers = [];

    (this: any).addBackButtonListener = this.addBackButtonListener.bind(this);
    (this: any).removeBackButtonListener = this.removeBackButtonListener.bind(this);
    (this: any).handleBackButton = this.handleBackButton.bind(this);
    (this: any).renderScene = this.renderScene.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    };
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        style={{flex: 1, backgroundColor: 'white'}}
        configureScene={(route) => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        initialRoute={{}}
        renderScene={this.renderScene}
      />
    );
  }

  addBackButtonListener(listener) {
    this._handlers.push(listener);
  }

  removeBackButtonListener(listener) {
    this._handlers = this._handlers.filter((handler) => handler !== listener);
  }

  handleBackButton() {
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true;
      }
    }

    const {navigator} = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    if (this.props.tab !== 'transactions') {
      this.props.dispatch(switchTab('transactions'));
      return true;
    }
    return false;
  }

  renderScene(route, navigator) {
    return <RNCTabsView navigator={navigator} />
  }
}

module.exports = RNCNavigator;
