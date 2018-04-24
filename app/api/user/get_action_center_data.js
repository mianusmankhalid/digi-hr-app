import HttpError from '@digihr_errors/HttpError';
import InternetConnectionError from '@digihr_errors/InternetConnectionError';
import userConstants from '../constants/user';
import data from './data/action_center_data';

/**
 * Performs a fake success and getting action center data
 */
function performSuccess() {
  return Promise.resolve(data);
}

/**
 * Performs a fake server error on getting action center data
 */
function performWithServerError() {
  return Promise.reject(new HttpError(504, 'Gateway Timeout'));
}

/**
 * Performs a fake account not found error on getting action center data
 */
function performWithResourceNotFound() {
  return Promise.reject(new HttpError(404, 'Resource not found'));
}

/**
 * Performs a fake connection timed out error on getting action center data
 */
function performWithConnectionTimedOut() {
  return Promise.reject(
    new InternetConnectionError(
      `Internet connection error, please check if you are still connected to the internet`
    )
  );
}

/**
 * Performs mock getting action center data, dependent upon strategyCode
 * @param {int} strategyCode
 */
export function getActionCenter(strategyCode) {
  switch (strategyCode) {
    case userConstants.helper_consts.ACTION_CENTER.OK:
      return performSuccess();
    case userConstants.helper_consts.ACTION_CENTER.ACCOUNT_NOT_FOUND:
      return performWithResourceNotFound();
    case userConstants.helper_consts.ACTION_CENTER.RESOURCE_NOT_FOUND:
      return performWithConnectionTimedOut();
    case userConstants.helper_consts.ACTION_CENTER.SERVER_PROBLEM:
      return performWithServerError();
    default:
      return performSuccess();
  }
}
