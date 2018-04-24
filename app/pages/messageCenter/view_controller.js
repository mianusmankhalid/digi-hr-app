import RouteConfig from '@digihr_app_config/routes';
import { getMessageCenterData } from '@digihr_api/user';

export function getMessageCenter() {
  return getMessageCenterData(1);
}
