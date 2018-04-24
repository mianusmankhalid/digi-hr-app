import React from 'react';
import { Platform } from 'react-native';
import {
  StackNavigator,
  HeaderBackButton,
  NavigationActions,
} from 'react-navigation';
import RouteConfig from '@digihr_app_config/routes';
import _ from 'lodash';
import theme from '@digihr_app_config/theme';
import NavigationHelper from './helper';

const Routes = RouteConfig.Routes;

const AppNavigator = StackNavigator(Routes, {
  headerMode: Platform.select({
    ios: () => 'float',
    android: () => 'screen',
  })(),
  navigationOptions: ({ navigation }) => ({
    headerBackTitle: null,
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
    headerTintColor: theme.background.colors.white,
    headerLeft: !_.isEqual(
      navigation.state.routeName,
      __APP_START_ROUTE_NAME__
    ) ? (
      <HeaderBackButton
        tintColor={theme.background.colors.gold}
        onPress={() => {
          NavigationHelper.onBackButtonPress(navigation);
        }}
      />
    ) : null,
  }),
});

export default AppNavigator;
