import RouteConfig from '@digihr_app_config/routes';
import { signupVerification } from '@digihr_api/user';

/**
 *
 * @param {string} icPassport
 * @param {string} password
 * @param {bool} isBiometric
 */
export function signupVerificationDetails(icPassport, password, isBiometric) {
  return signupVerification(icPassport, password, isBiometric, 1);
}

/**
 * Takes user to signup screes, if the user invitation code is accurate
 * @param {@digihr_lib/navigation/screen_helper} navHelper
 */
export function moveToWelcome(navHelper) {
  navHelper.navigate(RouteConfig.Screen.Welcome);
}
