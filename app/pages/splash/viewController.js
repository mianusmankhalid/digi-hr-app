import RouteConfig from '@digihr_app_config/routes';
import { authenticateUser, extendAuthSession } from '@digihr_api/user';
import { setUserAuthToken, getUserAuthInfo } from '@digihr_storage/user';
import AuthInfo from '@digihr_models/user/auth_info';

function userAuthenticated() {
  // For now lets just check and extend validity
  // If the user has logged in once
  return getUserAuthInfo().then(authInfo => {
    authInfoModel = new AuthInfo(authInfo, true);
    if (authInfoModel.IsTokenExpired) {
      return extendAuthSession(authInfo).then(newAuthInfo => {
        return setUserAuthToken(newAuthInfo);
      });
    } else {
      return true;
    }
  });
}

export function letUserIn(navHelper) {
  return userAuthenticated()
    .then(() => {
      navHelper.reset(RouteConfig.Screen.Dashboard);
    })
    .catch(() => {
      navHelper.reset(RouteConfig.Screen.Login);
    });
}
