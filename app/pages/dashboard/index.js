import React, { Component } from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { View, Text, YellowBox } from 'react-native';
import Dashboard from './dashboard';
import SideMenu from './side_menu';
import theme from '@digihr_app_config/theme';
import Icon from 'react-native-vector-icons/Feather';
import { getDashboard } from './view_controller';
import Onboarding from '../onboarding';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);

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
        width: '70%',
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

const OnboardingScreen = StackNavigator(
  {
    OnboardingScreen: {
      screen: Onboarding,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      title: 'ONBOARDING',
      headerStyle: {
        backgroundColor: theme.background.colors.black,
      },
      headerTitleStyle: {
        fontFamily: theme.font.family.muli,
        fontSize: theme.font.size.primary,
        color: theme.background.colors.white,
        textAlign: 'center',
        width: '70%',
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

class Expenses extends Component {
  render() {
    return (
      <View>
        <Text>{'Expenses'}</Text>
      </View>
    );
  }
}

class Travels extends Component {
  render() {
    return (
      <View>
        <Text>{'Travels'}</Text>
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
    // Dashboard: {
    //   screen: DashboardScreen,
    // },
    Onboarding: {
      screen: OnboardingScreen,
    },
    Expenses: {
      screen: Expenses,
    },
    Travels: {
      screen: Travels,
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
