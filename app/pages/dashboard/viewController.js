import RouteConfig from '@digihr_app_config/routes';

/**
 * Takes user to signup screes, if the user invitation code is accurate
 * @param {@digihr_lib/navigation/screen_helper} navHelper
 */
export function moveToMessageCenter(navHelper) {
  navHelper.navigate(RouteConfig.Screen.MessageCenter);
}
