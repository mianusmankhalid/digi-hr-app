import { NavigationActions } from 'react-navigation';
import * as DigiNavActions from '@digihr_lib/actions/digi_nav_actions';
import _ from 'lodash';
import { isDebuggingEnabled } from '@digihr_lib/dev_helper';

function NavigationHelper(instance, dispatch) {
  var provideNavResetAction = (screen, params = {}) => {
    return NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: screen, params: params }),
      ],
    });
  };

  var provideNavNavigateAction = (screen, params = {}) => {
    return NavigationActions.navigate({
      routeName: screen,
      params: params,
    });
  };

  var getPreviousScreenFromNavigationStack = (routes, currIndex) => {
    if (routes.length > 1) {
      return routes[currIndex - 1].key;
    }
    return null;
  };

  var getKeyForRouteNameFromEnd = (routes, routeName) => {
    let result = _.findLastIndex(routes, route => {
      return _.isEqual(route.routeName, routeName);
    });

    if (result !== -1) {
      return routes[result].key;
    }
    return null;
  };

  this.navigate = (screen, params = {}, passOldParams = true) => {
    if (typeof instance !== 'undefined' && instance !== null) {
      if (passOldParams) {
        params = { ...instance.props.navigation.state.params, ...params };
      }

      params = _.omit(params, __CURR_SCREEN_PARAMS__);

      var resetAction = provideNavNavigateAction(screen, params);
      instance.props.navigation.dispatch(resetAction);
    }
  };

  this.reset = (screen, params = {}, passOldParams = true) => {
    if (typeof instance !== 'undefined' && instance !== null) {
      if (passOldParams) {
        params = { ...instance.props.navigation.state.params, ...params };
      }

      params = _.omit(params, __CURR_SCREEN_PARAMS__);

      var resetAction = provideNavResetAction(screen, params);
      instance.props.navigation.dispatch(resetAction);
    }
  };

  this.goBack = (params = {}, key = null) => {
    if (typeof instance !== 'undefined' && instance !== null) {
      let forScreen = null;

      if (key !== null) {
        forScreen = getKeyForRouteNameFromEnd(
          instance.props.navState.routes,
          key
        );
      }

      if (forScreen === null) {
        forScreen = getPreviousScreenFromNavigationStack(
          instance.props.navState.routes,
          instance.props.navState.index
        );
      }

      const backAction = NavigationActions.back({
        key: key,
      });

      instance.props.navigation.dispatch(
        DigiNavActions.setGoBackScreenParams(forScreen, {
          ...params,
        })
      );
      instance.props.navigation.dispatch(backAction);
    }
  };

  // this.goBackTo = (pageName = null, params = null) => {
  //   if (typeof instance !== "undefined" && instance !== null) {
  //     if (params && pageName) {
  //       dispatch(actions.setGoBackScreenParams(pageName, params));
  //     }
  //     instance.props.navigation.goBack(pageName);
  //     if (pageName) {
  //       // dispatch(actions.setNavigatingBack(pageName));
  //     }
  //   }
  // };

  this.getBackParams = () => {
    if ('go_back_params' in instance.props.navigation.state.params) {
      return instance.props.navigation.state.params['go_back_params'];
    }
    return null;
  };

  this.backNavigationHappened = () => {
    if ('back_navigation_happened' in instance.props.navigation.state.params) {
      if (isDebuggingEnabled()) {
        console.groupCollapsed(
          'backNavigationHappened for ' + instance.displayName
        );

        if (_.has(instance.props.navigation.state.params, 'go_back_params')) {
          console.dir(instance.props.navigation.state.params.go_back_params);
        }
        console.groupEnd();
      }
      return true;
    }
    return false;
  };

  this.setScreenParams = params => {
    var screenParams = _.set({}, __CURR_SCREEN_PARAMS__, params);
    instance.props.navigation.setParams(screenParams);
  };
}

export default NavigationHelper;

// export default {
//   Helper: true,
// };
