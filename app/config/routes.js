import RouteManager from '@digihr_lib/navigation/navigation_route_manager';
import Route from '@digihr_lib/navigation/navigation_route';
import Landing from '@digihr_pages/landing';

RouteManager.Instance.add(
  new Route(__APP_START_ROUTE_NAME__, Landing, 'AppStartScreen')
);

const RouteConfig = {
  Routes: RouteManager.Instance.Routes,
  Screen: RouteManager.Instance.AvailableScreens,
};

export default Object.freeze(RouteConfig);
