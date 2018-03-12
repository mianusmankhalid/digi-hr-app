import * as storage from '@digihr_lib/storage';

const keys = {
  USER_AUTH_INFO: 'digi_user_auth_info',
};

export function setUserAuthInfo(authInfo) {
  return storage.storeInformation(keys.USER_AUTH_INFO, authInfo);
}

export function getUserAuthInfo() {
  return storage.getInformation(keys.USER_AUTH_INFO);
}

export function flushUserInfo() {
  return storage.purgeInformation(keys.USER_AUTH_INFO);
}
