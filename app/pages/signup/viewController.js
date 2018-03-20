import RouteConfig from '@digihr_app_config/routes';
import { signup } from '@digihr_api/user';

/**
 *
 * @param {string} code
 */
export function signupInvitationCode(code) {
  return signup(code, 1);
}

/**
 * Takes user to signup screes, if the user invitation code is accurate
 * @param {@digihr_lib/navigation/screen_helper} navHelper
 */
export function moveToSignupVerification(navHelper) {
  navHelper.navigate(RouteConfig.Screen.SignupVerification);
}

/**
 * Takes user to signup screes, if the user invitation code is accurate
 * @param {@digihr_lib/navigation/screen_helper} navHelper
 */
export function moveToPolicy(navHelper) {
  navHelper.navigate(RouteConfig.Screen.Policy);
}
