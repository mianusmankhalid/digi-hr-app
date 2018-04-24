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
import * as DigiNavActions from '@digihr_lib/actions/digi_nav_actions';

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
      width: '75%',
    },
    headerTintColor: theme.background.colors.white,
    headerLeft: !_.isEqual(
      navigation.state.routeName,
      __APP_START_ROUTE_NAME__
    ) ? (
      <HeaderBackButton
        tintColor={theme.background.colors.gold}
        onPress={() => {
          navigation.dispatch(DigiNavActions.setGoBackScreenParams());
          navigation.dispatch(
            NavigationActions.back({
              key: null,
            })
          );
        }}
      />
    ) : null,
  }),
});

export default AppNavigator;
