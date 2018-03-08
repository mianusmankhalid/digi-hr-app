import RouteConfig from '@digihr_app_config/routes';
import { ToastAndroid } from 'react-native';
import * as AppContext from '@digihr_lib/app_context';

export function letUserIn(email, password, navHelper) {
  if (AppContext.isAuthenticated(email, password)) {
    navHelper.navigate(RouteConfig.Screen.Dashboard);
  } else {
    ToastAndroid.show('Incorrect email or password', ToastAndroid.SHORT);
  }
}
