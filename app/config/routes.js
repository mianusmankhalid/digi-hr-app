import RouteManager from '@digihr_lib/navigation/navigation_route_manager';
import Route from '@digihr_lib/navigation/navigation_route';
import Dashboard from '@digihr_pages/dashboard';
import Login from '@digihr_pages/login';
import Splash from '@digihr_pages/splash';

RouteManager.Instance.add(
  new Route(__APP_START_ROUTE_NAME__, Splash, 'AppStartScreen')
);

RouteManager.Instance.add(new Route('Dashboard', Dashboard, 'DashboardScreen'));
RouteManager.Instance.add(new Route('Login', Login, 'LoginScreen'));

const RouteConfig = {
  Routes: RouteManager.Instance.Routes,
  Screen: RouteManager.Instance.AvailableScreens,
};

export default Object.freeze(RouteConfig);
