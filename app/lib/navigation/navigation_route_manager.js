import Route from './navigation_route';
import NavigationAwareScreen from './navigation_aware_screen';
import _ from 'lodash';

let instance = null;

class RouteManager {
  routes = {};

  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  get Instance() {
    return instance;
  }

  /**
   * @param {Route} route The route
   */
  add(route) {
    this.routes[route.Name] = {
      screen: NavigationAwareScreen(
        route.Name,
        route.Component,
        route.TrackingName
      ),
    };
  }

  get Routes() {
    return this.routes;
  }

  get AvailableScreens() {
    let enumObj = {};

    _.forEach(_.keys(this.routes), function(value) {
      enumObj[value] = value;
    });

    // returns an object like { key: "key" }
    // so that the screen constant and its value remain the same

    return enumObj;
  }
}

export default new RouteManager();
