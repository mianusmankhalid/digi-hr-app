import RouteManager from '@digihr_lib/navigation/navigation_route_manager';
import Route from '@digihr_lib/navigation/navigation_route';
import Landing from '@digihr_pages/landing';
import PageTwo from '@digihr_pages/pagetwo';

RouteManager.Instance.add(
  new Route(__APP_START_ROUTE_NAME__, Landing, 'AppStartScreen')
);

RouteManager.Instance.add(new Route('PageTwo', PageTwo, 'PageTwoScreen'));

const RouteConfig = {
  Routes: RouteManager.Instance.Routes,
  Screen: RouteManager.Instance.AvailableScreens,
};

export default Object.freeze(RouteConfig);
