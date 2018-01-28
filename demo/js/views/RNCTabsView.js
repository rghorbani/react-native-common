
const React = require('react');
const PropTypes = require('prop-types');
import Drawer from 'react-native-drawer'
const autoBind = require('react-autobind');
const { FlatList, TextInput, StyleSheet, View } = require('react-native');
// const { TextInput } = require('react-native-common');
const MenuItem = require('./MenuItem');
const menuData = require('./menuData');

class RNCTabsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'button',
    };

    autoBind(this);
  }

  getChildContext() {
    return {
      openDrawer: this.openDrawer,
      // hasUnreadNotifications: this.props.notificationsBadge > 0,
    };
  }

  render() {
    return (
      <Drawer
        ref={(ref) => this.drawer = ref}
        type="static"
        content={this.renderNavigationView()}
        openDrawerOffset={0.2}
        panThreshold={0.08}
        initializeOpen={true}
      >
        <View style={styles.content} key={this.state.tab}>
          {this.renderContent()}
        </View>
      </Drawer>
    );
  }

  openDrawer() {
    this.drawer.open();
  }

  onTabSelect(tab) {
    if (this.state.tab !== tab) {
      this.setState({ tab });
    }
    this.drawer.close();
  }

  renderNavigationView() {
    return (
      <View style={styles.drawer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={this.state.filterText}
            onChangeText={this.filterExplorerScreens}
            hideUnderline
            placeholder="Search your component.."
          />
        </View>
        <FlatList
          data={menuData}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item.tag}
        />
      </View>
    );
  }

  renderItem({item}) {
    return (
      <MenuItem
        title={item.title}
        selected={this.state.tab === item.tag}
        onPress={() => this.onTabSelect(item.tag)}
      />
    );
  }

  renderContent() {
    for (let i = 0; i < menuData.length; i++) {
      if (this.state.tab === menuData[i].tag) {
        const Screen = menuData[i].component;
        return <Screen navigator={this.props.navigator} />;
      }
    }

    throw new Error(`Unknown tab ${this.state.tab}`);
  }
}

RNCTabsView.childContextTypes = {
  openDrawer: PropTypes.func,
  // hasUnreadNotifications: PropTypes.number,
};

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: 'blue',
  },
  content: {
    flex: 1,
  },
  inputWrapper: {
    marginTop: 20,
    marginLeft: 20,
  },
  input: {
    textAlign: 'left',
    fontSize: 15,
  },
})

module.exports = RNCTabsView;
