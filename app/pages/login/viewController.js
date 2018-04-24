import RouteConfig from '@digihr_app_config/routes';
import * as AppContext from '@digihr_lib/app_context';
import { authenticateUser } from '@digihr_api/user';
import {
  setUserAuthInfo,
  getUserAuthInfo,
  flushUserInfo,
} from '@digihr_storage/user';
import moment from 'moment';
import AuthInfo from '@digihr_models/user/auth_info';

/**
 *
 * @param {string} email
 * @param {string} password
 */
export function loginUser(email, password) {
  return authenticateUser(email, password).then(authInfo => {
    // add created time to the auth info to keep track
    authInfo = {
      ...authInfo,
      created_at: moment(),
    };

    return flushUserInfo().then(() => {
      return setUserAuthInfo(authInfo);
    });
  });
}

/**
 *
 * @param {@digihr_lib/navigation/screen_helper} navHelper
 */
export function moveToNextScreen(navHelper) {
  navHelper.reset(RouteConfig.Screen.Dashboard);
}

/**
 *
 * @param {@digihr_lib/navigation/screen_helper} navHelper
 */
export function moveToResetPassword(navHelper) {
  navHelper.navigate(RouteConfig.Screen.ResetPassword);
}

/**
 *
 * @param {@digihr_lib/navigation/screen_helper} navHelper
 */
export function moveToSignup(navHelper) {
  navHelper.navigate(RouteConfig.Screen.Dashboard);
}
