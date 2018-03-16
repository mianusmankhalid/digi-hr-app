import RouteConfig from '@digihr_app_config/routes';
import { signup } from '@digihr_api/user';

/**
 *
 * @param {string} code
 */
export function signupInvitationCode(code) {
  return signup(code, 3);
}

/**
 * Takes user to signup screes, if the user invitation code is accurate
 * @param {@digihr_lib/navigation/screen_helper} navHelper
 */
export function moveToSignupVerification(navHelper) {
  navHelper.reset(RouteConfig.Screen.SignupVerification);
}
