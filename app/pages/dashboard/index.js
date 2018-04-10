import React, { Component } from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { View, Text } from 'react-native';
import Dashboard from './dashboard';
import SideMenu from './side_menu';
import theme from '@digihr_app_config/theme';
import Icon from 'react-native-vector-icons/Feather';
import { getDashboard } from './view_controller';

const DashboardScreen = StackNavigator(
  {
    DashboardScreen: {
      screen: Dashboard,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      title: 'DASHBOARD',
      headerStyle: {
        backgroundColor: theme.background.colors.black,
      },
      headerTitleStyle: {
        fontFamily: theme.font.family.muli,
        fontSize: theme.font.size.primary,
        color: theme.background.colors.white,
        textAlign: 'center',
        width: '75%',
      },
      headerLeft: (
        <View style={{ marginLeft: 10 }}>
          <Icon
            name="menu"
            size={30}
            color={theme.background.colors.gold}
            onPress={() => navigation.navigate('DrawerOpen')}
          />
        </View>
      ),
    }),
  }
);

class Onboarding extends Component {
  render() {
    return (
      <View>
        <Text>{'Onboarding'}</Text>
      </View>
    );
  }
}

class Leaves extends Component {
  render() {
    return (
      <View>
        <Text>{'Leaves'}</Text>
      </View>
    );
  }
}

class Logout extends Component {
  render() {
    return (
      <View>
        <Text>{'Logout'}</Text>
      </View>
    );
  }
}

class Profile extends Component {
  render() {
    return (
      <View>
        <Text>{'Profile'}</Text>
      </View>
    );
  }
}

let Drawer = DrawerNavigator(
  {
    Dashboard: {
      screen: DashboardScreen,
    },
    Onboarding: {
      screen: Onboarding,
    },
    Leaves: {
      screen: Leaves,
    },
    Logout: {
      screen: Logout,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    contentComponent: SideMenu,
    drawerWidth: 250,
  }
);

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardData: {},
    };
  }

  componentDidMount() {
    this.getDashboardData().then(data => {
      this.setState({
        dashboardData: data,
      });
    });
  }

  getDashboardData() {
    return getDashboard(this.props.nav_helper);
  }

  render() {
    return (
      <Drawer
        screenProps={{
          navHelper: this.props.nav_helper,
          dashboardData: this.state.dashboardData,
        }}
      />
    );
  }
}
