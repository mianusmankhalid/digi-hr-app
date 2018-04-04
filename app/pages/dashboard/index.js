import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import { View, Text, Button } from 'react-native';
import Dashboard from './dashboard';
//import SideMenu from './side_menu';

class Travel extends Component {
  static navigationOptions = {
    drawerLabel: 'Travel',
  };
  render() {
    return (
      <View>
        <Text>{'Travel'}</Text>
      </View>
    );
  }
}

class Leaves extends Component {
  static navigationOptions = {
    drawerLabel: 'Leaves',
  };
  render() {
    return (
      <View>
        <Text>{'Leaves'}</Text>
      </View>
    );
  }
}

class Logout extends Component {
  static navigationOptions = {
    drawerLabel: 'Logout',
  };
  render() {
    return (
      <View>
        <Text>{'Logout'}</Text>
      </View>
    );
  }
}

let Drawer = DrawerNavigator(
  {
    Home: {
      screen: props => <Dashboard nav_helper={props.nav_helper} />,
    },
    Travel: {
      screen: Travel,
    },
    Leaves: {
      screen: Leaves,
    },
    Logout: {
      screen: Logout,
    },
  }
  // {
  //   contentComponent: SideMenu,
  //   drawerWidth: 300,
  // }
);

export default class DashboardScreen extends Component {
  render() {
    return <Drawer nav_helper={this.props.nav_helper} />;
  }
}
