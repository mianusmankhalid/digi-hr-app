import RouteConfig from '@digihr_app_config/routes';
import * as AppContext from '@digihr_lib/app_context';

export function letUserIn(email, password, navHelper) {
  if (AppContext.isAuthenticated(email, password)) {
    navHelper.navigate(RouteConfig.Screen.Dashboard);
  } else {
    alert('incorrect username or password');
  }
}
