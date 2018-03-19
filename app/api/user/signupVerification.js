import HttpError from '@digihr_errors/HttpError';
import InternetConnectionError from '@digihr_errors/InternetConnectionError';
import userConstants from '../constants/user';

/**
 * Performs a fake success on updating detail request
 * @param {string} icPassport
 * @param {string} password
 * @param {bool} isBiometric
 */
function performSuccess(icPassport, password, isBiometric) {
  return Promise.resolve();
}

/**
 * Performs a fake server error on updating detail request
 */
function performWithServerError() {
  return Promise.reject(new HttpError(504, 'Gateway Timeout'));
}

/**
 * Performs a fake account not found error on updating detail request
 */
function performWithAccountNotFound() {
  return Promise.reject(new HttpError(401, 'Unauthorized'));
}

/**
 * Performs a fake connection timed out error on updating detail request
 */
function performWithConnectionTimedOut() {
  return Promise.reject(
    new InternetConnectionError(
      `Internet connection error, please check if you are still connected to the internet`
    )
  );
}

/**
 * Performs mock updating detail, dependent upon strategyCode
 * @param {string} icPassport
 * @param {string} password
 * @param {bool} isBiometric
 * @param {int} strategyCode
 */
export function performSignupVerification(
  icPassport,
  password,
  isBiometric,
  strategyCode
) {
  switch (strategyCode) {
    case userConstants.helper_consts.RESET_PASSWORD.OK:
      return performSuccess(icPassport, password, isBiometric);
    case userConstants.helper_consts.RESET_PASSWORD.ACCOUNT_NOT_FOUND:
      return performWithAccountNotFound();
    case userConstants.helper_consts.RESET_PASSWORD.CONNETION_TIMEDOUT:
      return performWithConnectionTimedOut();
    case userConstants.helper_consts.RESET_PASSWORD.SERVER_PROBLEM:
      return performWithServerError();
    default:
      return performSuccess(icPassport, password, isBiometric);
  }
}
