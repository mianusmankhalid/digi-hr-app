import RouteManager from '@digihr_lib/navigation/navigation_route_manager';
import Route from '@digihr_lib/navigation/navigation_route';
import Splash from '@digihr_pages/splash';
import Dashboard from '@digihr_pages/dashboard';
import Login from '@digihr_pages/login';
import Welcome from '@digihr_pages/welcome';
import ResetPassword from '@digihr_pages/resetPassword';
import Signup from '@digihr_pages/signup';
import Policy from '@digihr_pages/signup/policy';
import SignupVerification from '@digihr_pages/signupVerification';

RouteManager.Instance.add(
  new Route(__APP_START_ROUTE_NAME__, Splash, 'AppStartScreen')
);

RouteManager.Instance.add(new Route('Dashboard', Dashboard, 'DashboardScreen'));
RouteManager.Instance.add(new Route('Login', Login, 'LoginScreen'));
RouteManager.Instance.add(new Route('Welcome', Welcome, 'WelcomeScreen'));
RouteManager.Instance.add(
  new Route('ResetPassword', ResetPassword, 'ResetPasswordScreen')
);
RouteManager.Instance.add(new Route('Signup', Signup, 'SignupScreen'));
RouteManager.Instance.add(
  new Route(
    'SignupVerification',
    SignupVerification,
    'SignupVerificationScreen'
  )
);
RouteManager.Instance.add(new Route('Policy', Policy, 'PolicyScreen'));

const RouteConfig = {
  Routes: RouteManager.Instance.Routes,
  Screen: RouteManager.Instance.AvailableScreens,
};

export default Object.freeze(RouteConfig);
