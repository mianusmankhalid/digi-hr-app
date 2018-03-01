import RouteConfig from '@digihr_app_config/routes';
import * as AppContext from '@digihr_lib/app_context';

export function letUserIn(navHelper) {
  if (AppContext.isUserLoggedIn()) {
    navHelper.navigate(RouteConfig.Screen.PageTwo);
  } else {
    //navHelper.navigate(RouteConfig.Screen.Someother);
  }
}
