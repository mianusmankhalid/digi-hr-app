import RouteConfig from '@digihr_app_config/routes';
import { getOnboardingData } from '@digihr_api/user';

export function getOnboarding() {
  return getOnboardingData(1);
}
