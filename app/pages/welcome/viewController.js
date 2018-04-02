import RouteConfig from "@digihr_app_config/routes";
import { welcomePage } from "@digihr_api/user";
import ResourceManager from "@digihr_lib/resource_manager";

export function welcomePageDetails() {
  return welcomePage(1);
}

/**
 * Takes user to signup screes, if the user invitation code is accurate
 * @param {@digihr_lib/navigation/screen_helper} navHelper
 */
export function moveToDashboard(navHelper) {
  navHelper.reset(RouteConfig.Screen.Dashboard);
}

export function getCompanyLogo() {
  let key = "CompanyLogoUrl";
  logoTupple = ResourceManager.getInstance().getResourceTupple(key);

  return ResourceManager.getInstance()
    .getResourceFile(key, true)
    .then(data => {
      return logoTupple.info.extDetails + data;
    });
}

export function getCompanyBackground() {
  let key = "CompanyBackgroundImage";
  logoTupple = ResourceManager.getInstance().getResourceTupple(key);

  return ResourceManager.getInstance()
    .getResourceFile(key, true)
    .then(data => {
      return logoTupple.info.extDetails + data;
    });
}
