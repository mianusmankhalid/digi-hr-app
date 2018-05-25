import HttpError from '@digihr_errors/HttpError';
import InternetConnectionError from '@digihr_errors/InternetConnectionError';
import userConstants from '../constants/user';

/**
 * Performs a fake success on reset email request
 * @param {string} email
 */
function performSuccess(email) {
  return Promise.resolve({
    message: `An email has been sent to ${email} with reset instructions`,
  });
}

/**
 * Performs a fake server error on reset email request
 */
function performWithServerError() {
  return Promise.reject(new HttpError(504, 'Gateway Timeout'));
}

/**
 * Performs a fake account not found error on reset email request
 */
function performWithAccountNotFound() {
  return Promise.reject(new HttpError(401, 'Unauthorized'));
}

/**
 * Performs a fake connection timed out error on reset email request
 */
function performWithConnectionTimedOut() {
  return Promise.reject(
    new InternetConnectionError(
      `Internet connection error, please check if you are still connected to the internet`
    )
  );
}

/**
 * Performs mock reset password, dependent upon strategyCode
 * @param {string} email
 * @param {int} strategyCode
 */
export function performResetPassword(email, strategyCode) {
  switch (strategyCode) {
    case userConstants.helper_consts.RESET_PASSWORD.OK:
      return performSuccess(email);
    case userConstants.helper_consts.RESET_PASSWORD.ACCOUNT_NOT_FOUND:
      return performWithAccountNotFound();
    case userConstants.helper_consts.RESET_PASSWORD.CONNETION_TIMEDOUT:
      return performWithConnectionTimedOut();
    case userConstants.helper_consts.RESET_PASSWORD.SERVER_PROBLEM:
      return performWithServerError();
    default:
      return performSuccess(email);
  }
}
