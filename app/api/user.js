import userConstants from './constants/user';
import AuthInfo from '@digihr_models/user/auth_info';
import * as Responses from '@digihr_models/user/responses';
import _ from 'lodash';

/**
 *
 * @param {string} email
 * @param {string} password
 */
export function authenticateUser(email, password) {
  return new Promise((resolve, reject) => {
    if (
      _.isEqual(email, userConstants.email) &&
      _.isEqual(password, userConstants.password)
    ) {
      resolve(
        new AuthInfo({
          access_token: 'ABCDEF',
          token_type: 'Bearer',
          expires_in: 5000,
        })
      );
    }
    reject(false);
  });
}

/**
 *
 * @param {string} email
 */
export function resetPassword(email) {
  return new Promise((resolve, reject) => {
    if (_.isEqual(200, userConstants.code)) {
      resolve(Responses.success());
    } else reject(Responses.notApplied());
  });
}

/**
 *
 * @param {AuthInfo} authInfo
 */
export function extendAuthSession(authInfo) {
  return new Promise(resolve => {
    resolve(
      new AuthInfo({
        access_token: 'ABCDEF',
        token_type: 'Bearer',
        expires_in: 5000,
      })
    );
  });
}
