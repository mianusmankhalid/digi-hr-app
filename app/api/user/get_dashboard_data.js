import HttpError from '@digihr_errors/HttpError';
import InternetConnectionError from '@digihr_errors/InternetConnectionError';
import userConstants from '../constants/user';

/**
 * Performs a fake success and getting dashboard data
 */
function performSuccess() {
  return Promise.resolve({
    chatbotImage: userConstants.chatbotImage,
    userName: userConstants.userName,
    userImage: userConstants.userImage,
    userTitle: userConstants.userTitle,
  });
}

/**
 * Performs a fake server error on getting dashboard data
 */
function performWithServerError() {
  return Promise.reject(new HttpError(504, 'Gateway Timeout'));
}

/**
 * Performs a fake account not found error on getting dashboard data
 */
function performWithResourceNotFound() {
  return Promise.reject(new HttpError(404, 'Resource not found'));
}

/**
 * Performs a fake connection timed out error on getting dashboard data
 */
function performWithConnectionTimedOut() {
  return Promise.reject(
    new InternetConnectionError(
      `Internet connection error, please check if you are still connected to the internet`
    )
  );
}

/**
 * Performs mock getting dashboard data, dependent upon strategyCode
 * @param {int} strategyCode
 */
export function getDashboard(strategyCode) {
  switch (strategyCode) {
    case userConstants.helper_consts.DASHBOARD.OK:
      return performSuccess();
    case userConstants.helper_consts.DASHBOARD.ACCOUNT_NOT_FOUND:
      return performWithResourceNotFound();
    case userConstants.helper_consts.DASHBOARD.RESOURCE_NOT_FOUND:
      return performWithConnectionTimedOut();
    case userConstants.helper_consts.DASHBOARD.SERVER_PROBLEM:
      return performWithServerError();
    default:
      return performSuccess();
  }
}
