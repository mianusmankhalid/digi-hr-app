import { NavigationActions } from 'react-navigation';
import _ from 'lodash';

export default class NavigationHelper {
  static getParams(store, navName) {
    const navRoute = store.navigation.routes.filter(
      route => route.routeName.localeCompare(navName) === 0
    );

    if (navRoute.length > 0) {
      if (navRoute[0].hasOwnProperty('params')) {
        return navRoute[0].params;
      }
    }
    return {};
  }

  static getParam(store, navName, paramName) {
    var requestedParams = NavigationHelper.getParams(store, navName);
    if (requestedParams.hasOwnProperty(paramName)) {
      return requestedParams[paramName];
    } else {
      return {};
    }
  }

  static getParamFromState(state, paramName) {
    return !_.isEmpty(state) &&
      state.hasOwnProperty('params') &&
      state.params.hasOwnProperty(paramName)
      ? state.params[paramName]
      : {};
  }

  static reset(navigation, screen, params = {}, passOldParams = false) {
    if (passOldParams) {
      params = { ...navigation.state.params, ...params };
    }

    var resetAction = NavigationHelper.getNavResetAction(screen, params);
    navigation.dispatch(resetAction);
  }

  static navigate(navigation, screen, params = {}, passOldParams = false) {
    if (passOldParams) {
      params = { ...navigation.state.params, ...params };
    }

    var resetAction = NavigationHelper.getNavigateAction(screen, params);
    navigation.dispatch(resetAction);
  }

  static getNavResetAction(screen, params = {}) {
    return NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: screen, params: params }),
      ],
    });
  }

  static getNavigateAction(screen, params = {}) {
    return NavigationActions.navigate({
      routeName: screen,
      params: params,
    });
  }

  static getCurrentParams(state) {
    if (state.routes) {
      return NavigationHelper.getCurrentParams(state.routes[state.index]);
    }
    return state.params || {};
  }

  static getCurrentScreenParams(state) {
    if (state.routes) {
      return NavigationHelper.getCurrentParams(state.routes[state.index]);
    }

    var retObj = state.params || {};

    if (_.has(retObj, __CURR_SCREEN_PARAMS__)) {
      return _.get(retObj, __CURR_SCREEN_PARAMS__);
    }
    return retObj;
  }
}
