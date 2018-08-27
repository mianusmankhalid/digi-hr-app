import userConstants from '../constants/user';
import AuthInfo from '@digihr_models/user/auth_info';
import _ from 'lodash';
import { getActionCenter } from './get_action_center_data';
import { getMessageCenter } from './get_message_center_data';
import { getDashboard } from './get_dashboard_data';
import { getOnboarding } from './get_onboarding_data';
import { performResetPassword } from './reset_password';
import * as ResetPasswordProcessor from './processor/reset_password';
import * as ActionCenterProcessor from './processor/action_center';
import * as MessageCenterProcessor from './processor/message_center';
import * as DashboardProcessor from './processor/dashboard';
import * as Onboarding from './processor/onboarding';

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
    throw ResetPasswordProcessor.processError(e, email);
  });
}

/**
 * Performs a get dashboard action center data API call
 * @param {userConstants.helper_consts.ACTION_CENTER} strategy
 */
export function getActionCenterData(
  strategy = userConstants.helper_consts.ACTION_CENTER.OK
) {
  return getActionCenter(strategy).catch(e => {
    throw ActionCenterProcessor.processError(e);
  });
}

/**
 * Performs a get dashboard message center data API call
 * @param {userConstants.helper_consts.MESSAGE_CENTER} strategy
 */
export function getMessageCenterData(
  strategy = userConstants.helper_consts.MESSAGE_CENTER.OK
) {
  return getMessageCenter(strategy).catch(e => {
    throw MessageCenterProcessor.processError(e);
  });
}

/**
 * Performs a get dashboard message center data API call
 * @param {userConstants.helper_consts.MESSAGE_CENTER} strategy
 */
export function getDashboardData(
  strategy = userConstants.helper_consts.MESSAGE_CENTER.OK
) {
  return getDashboard(strategy).catch(e => {
    throw DashboardProcessor.processError(e);
  });
}

/**
 * Performs a get dashboard message center data API call
 * @param {userConstants.helper_consts.MESSAGE_CENTER} strategy
 */
export function getOnboardingData(
  strategy = userConstants.helper_consts.MESSAGE_CENTER.OK
) {
  return getOnboarding(strategy).catch(e => {
    throw Onboarding.processError(e);
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
