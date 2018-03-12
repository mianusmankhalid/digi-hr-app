import RouteConfig from '@digihr_app_config/routes';
import { resetPassword } from '@digihr_api/user';

/**
 *
 * @param {string} email
 */
export function resetUserPassword(email) {
  return resetPassword(email).then();
}

/**
 *
 * @param {@digihr_lib/navigation/screen_helper} navHelper
 */
export function moveToNextScreen(navHelper) {
  navHelper.reset(RouteConfig.Screen.Login);
}
