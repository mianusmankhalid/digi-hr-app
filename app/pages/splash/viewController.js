import RouteConfig from '@digihr_app_config/routes';
import * as AppContext from '@digihr_lib/app_context';

export function letUserIn(navHelper) {
  if (AppContext.isUserLoggedIn()) {
    navHelper.reset(RouteConfig.Screen.Dashboard);
  } else {
    navHelper.reset(RouteConfig.Screen.Login);
  }
}
