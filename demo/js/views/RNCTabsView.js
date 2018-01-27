
const React = require('react');
const Drawer = require('react-native-drawer');
const autoBind = require('react-autobind');
const { View } = require('react-native');
const MenuItem = require('./MenuItem');
const menuData = require('./menuData');

class RGFTabsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'button',
    };

    // this.openDrawer = this.openDrawer.bind(this);
    // this.onTabSelect = this.onTabSelect.bind(this);
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
        type="overlay"
        content={this.renderNavigationView}
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

  onTabSelect(tab: Tab) {
    if (this.props.tab !== tab) {
      this.setState({ tab });
    }
    this.drawer.closeDrawer();
  }

  renderNavigationView() {
    return (
      <View style={styles.drawer}>
        <View style={{marginTop: 20, marginLeft: 20}}>
          <TextInput
            value={this.state.filterText}
            onChangeText={this.filterExplorerScreens}
            hideUnderline
            placeholder="Search your component.."
          />
        </View>
        <FlatList
          data={menuData}
          renderItem={this.renderItem}
        />
      </View>
    );
  }

  renderItem({item}) {
    return (
      <MenuItem
        title={item.title}
        selected={this.state.tab === item.tag}
        onPress={this.onTabSelect(item.tag)}
      />
    );
  }

  renderContent() {
    switch (this.state.tab) {
      case 'home':
        return (
          <HomeView
            navigator={this.props.navigator}
          />
        );

      case 'transactions':
        return (
          <TransactionView
            navigator={this.props.navigator}
          />
        );

      case 'settings':
        return (
          <SettingView
            navigator={this.props.navigator}
          />
        );

      case 'notifications':
        return <RGFNotificationsView navigator={this.props.navigator} />;
    }
    throw new Error(`Unknown tab ${this.props.tab}`);
  }
}

module.exports = RGFTabsView;
