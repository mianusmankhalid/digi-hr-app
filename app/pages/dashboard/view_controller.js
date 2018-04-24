import RouteConfig from '@digihr_app_config/routes';
import {
  getActionCenterData,
  getMessageCenterData,
  getDashboardData,
} from '@digihr_api/user';

export function getActionCenter() {
  return getActionCenterData(1);
}

export function getMessageCenter() {
  return getMessageCenterData(1);
}

export function getDashboard() {
  return getDashboardData(1);
}

/**
 * Takes user to signup screes, if the user invitation code is accurate
 * @param {@digihr_lib/navigation/screen_helper} navHelper
 */
export function moveToMessageCenter(navHelper) {
  navHelper.navigate(RouteConfig.Screen.MessageCenter);
}
