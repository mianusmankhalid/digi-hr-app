import { NavigationActions } from 'react-navigation';
import { Screen } from '@digihr_app_config/routes';
import { GetParamsForScreen } from './mock_data_creator';

// Change screen name here that should be replaced by AppStart screen
const defaultRoute = {
  routeName: __MODIFIED_APP_START_ROUTE_NAME__,
  routeParams: GetParamsForScreen(__MODIFIED_APP_START_ROUTE_NAME__),
};

const fireAlteredHomePage = store => next => action => {
  if (
    action.type.includes('Navigation') &&
    (action.type === NavigationActions.NAVIGATE ||
      action.type === NavigationActions.RESET) &&
    action.actions.length === 1 &&
    action.actions[0].routeName.localeCompare(__APP_START_ROUTE_NAME__) === 0
  ) {
    action.actions[0].routeName = defaultRoute.routeName;
    action.actions[0].params = defaultRoute.routeParams || {};
  }

  next(action);
};

export default fireAlteredHomePage;
