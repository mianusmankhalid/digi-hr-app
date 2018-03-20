import HttpError from '@digihr_errors/HttpError';
import InternetConnectionError from '@digihr_errors/InternetConnectionError';
import userConstants from '../constants/user';

function performSuccess() {
  return Promise.resolve({
    welcomeText: userConstants.welcomeText,
    logoUrl: userConstants.logoUrl,
    backgroundImageUrl: userConstants.backgroundImageUrl,
  });
}

/**
 * Performs a fake server error on reset email request
 */
function performWithServerError() {
  return Promise.reject(new HttpError(504, 'Gateway Timeout'));
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
 * Performs mock welcome page, dependent upon strategyCode
 * @param {int} strategyCode
 */
export function performWelcomePage(strategyCode) {
  switch (strategyCode) {
    case userConstants.helper_consts.WELCOME.OK:
      return performSuccess();
    case userConstants.helper_consts.WELCOME.CONNETION_TIMEDOUT:
      return performWithConnectionTimedOut();
    case userConstants.helper_consts.WELCOME.SERVER_PROBLEM:
      return performWithServerError();
    default:
      return performSuccess();
  }
}
