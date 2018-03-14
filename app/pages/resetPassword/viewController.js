import RouteConfig from '@digihr_app_config/routes';
import { resetPassword } from '@digihr_api/user';

/**
 *
 * @param {string} email
 */
export function resetUserPassword(email) {
  return resetPassword(email, 3);
}

/**
 * Takes user back to login screen, if the reset password is success
 * @param {@digihr_lib/navigation/screen_helper} navHelper
 */
export function moveToLoginScreen(navHelper) {
  navHelper.reset(RouteConfig.Screen.Login);
}
