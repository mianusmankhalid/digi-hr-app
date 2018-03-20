import userConstants from '../constants/user';
import AuthInfo from '@digihr_models/user/auth_info';
import _ from 'lodash';
import { performResetPassword } from './reset_password';
import { performSignup } from './signup';
import { performSignupVerification } from './signupVerification';
import { performWelcomePage } from './welcomePage';
import * as ErrorProcessing from './processor/error_processing';

/**
 * Performs an authenticate user API call
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
 * Performs a reset password API call
 * @param {string} email
 * @param {userConstants.helper_consts.RESET_PASSWORD} strategy
 */
export function resetPassword(
  email,
  strategy = userConstants.helper_consts.RESET_PASSWORD.OK
) {
  return performResetPassword(email, strategy).catch(e => {
    throw ErrorProcessing.processError(e, email);
  });
}

/**
 * Performs a confirm signup invitation code API call
 * @param {string} code
 * @param {userConstants.helper_consts.SIGNUP} strategy
 */
export function signup(code, strategy = userConstants.helper_consts.SIGNUP.OK) {
  return performSignup(code, strategy).catch(e => {
    throw ErrorProcessing.processError(e, code);
  });
}

/**
 * Performs a confirm signup invitation code API call
 * @param {string} icPassport
 * @param {string} password
 * @param {bool} isBiometric
 * @param {userConstants.helper_consts.SIGNUP} strategy
 */
export function signupVerification(
  icPassport,
  password,
  isBiometric,
  strategy = userConstants.helper_consts.SIGNUP.OK
) {
  return performSignupVerification(
    icPassport,
    password,
    isBiometric,
    strategy
  ).catch(e => {
    throw ErrorProcessing.processError(e, code);
  });
}

/**
 * Performs a confirm signup invitation code API call
 * @param {userConstants.helper_consts.SIGNUP} strategy
 */
export function welcomePage(strategy = userConstants.helper_consts.SIGNUP.OK) {
  return performWelcomePage(strategy).catch(e => {
    throw ErrorProcessing.processError(e, code);
  });
}

/**
 * Performs an extend authenticated session API call
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
