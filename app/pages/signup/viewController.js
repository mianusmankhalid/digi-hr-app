import RouteConfig from "@digihr_app_config/routes";
import { signup } from "@digihr_api/user";
import ResourceManager from "@digihr_lib/resource_manager";

/**
 *
 * @param {string} code
 */
export function signupInvitationCode(code) {
  return signup(code, 1);
}

/**
 * Takes user to signup screes, if the user invitation code is accurate
 * @param {@digihr_lib/navigation/screen_helper} navHelper
 */
export function moveToSignupVerification(navHelper) {
  navHelper.navigate(RouteConfig.Screen.SignupVerification);
}

/**
 * Takes user to signup screes, if the user invitation code is accurate
 * @param {@digihr_lib/navigation/screen_helper} navHelper
 */
export function moveToPolicy(navHelper) {
  navHelper.navigate(RouteConfig.Screen.Policy);
}

export function downloadPolicyUrl(policyUrl) {
  return ResourceManager.getInstance().downloadResource(
    policyUrl,
    "termsAndConditionHtml"
  );
}

export function getTermsAndConditionHtml() {
  return ResourceManager.getInstance().getResourceFile("termsAndConditionHtml");
}
