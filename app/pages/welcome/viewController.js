import RouteConfig from '@digihr_app_config/routes';
import { welcomePage } from '@digihr_api/user';

export function welcomePageDetails() {
  return welcomePage(1);
}

/**
 * Takes user to signup screes, if the user invitation code is accurate
 * @param {@digihr_lib/navigation/screen_helper} navHelper
 */
export function moveToDashboard(navHelper) {
  navHelper.reset(RouteConfig.Screen.Dashboard);
}
