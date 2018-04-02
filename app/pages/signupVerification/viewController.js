import RouteConfig from "@digihr_app_config/routes";
import { signupVerification } from "@digihr_api/user";
import ResourceManager from "@digihr_lib/resource_manager";
import { getBase64PrependUriText } from "@digihr_lib/util/image_helper";

/**
 *
 * @param {string} icPassport
 * @param {string} password
 * @param {bool} isBiometric
 */
export function signupVerificationDetails(icPassport, password, isBiometric) {
  return signupVerification(icPassport, password, isBiometric, 1).then(
    companyDetails => {
      let companyUrlExtDetail = getBase64PrependUriText(companyDetails.logoUrl);
      return ResourceManager.getInstance()
        .downloadResource(companyDetails.logoUrl, "CompanyLogoUrl", {
          extDetails: companyUrlExtDetail
        })
        .then(() => {
          let companyBGExtDetail = getBase64PrependUriText(
            companyDetails.backgroundImageUrl
          );
          return ResourceManager.getInstance().downloadResource(
            companyDetails.backgroundImageUrl,
            "CompanyBackgroundImage",
            {
              extDetails: companyBGExtDetail
            }
          );
        })
        .then(() => companyDetails.welcomeText);
    }
  );
}

/**
 * Takes user to signup screes, if the user invitation code is accurate
 * @param {@digihr_lib/navigation/screen_helper} navHelper
 */
export function moveToWelcome(navHelper, welcomeText) {
  navHelper.navigate(RouteConfig.Screen.Welcome, {
    welcomeText: welcomeText
  });
}
