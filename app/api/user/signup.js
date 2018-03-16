import HttpError from '@digihr_errors/HttpError';
import InternetConnectionError from '@digihr_errors/InternetConnectionError';
import userConstants from '../constants/user';

/**
 * Performs a fake success on signup request
 */
function performSuccess() {
  return Promise.resolve();
}

/**
 * Performs a fake server error on signup request
 */
function performWithServerError() {
  return Promise.reject(new HttpError(504, 'Gateway Timeout'));
}

/**
 * Performs a fake incorrect invitation code error on signup request
 */
function performWithIncorrectInvitationCode() {
  return Promise.reject(new HttpError(400, 'Bad Request'));
}

/**
 * Performs a fake connection timed out error on signup request
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
 * @param {string} code
 * @param {int} strategyCode
 */
export function performSignup(code, strategyCode) {
  switch (strategyCode) {
    case userConstants.helper_consts.SIGNUP.OK:
      return performSuccess(code);
    case userConstants.helper_consts.SIGNUP.INCORRECT_INVITATION_CODE:
      return performWithIncorrectInvitationCode();
    case userConstants.helper_consts.SIGNUP.CONNETION_TIMEDOUT:
      return performWithConnectionTimedOut();
    case userConstants.helper_consts.SIGNUP.SERVER_PROBLEM:
      return performWithServerError();
    default:
      return performSuccess(code);
  }
}
