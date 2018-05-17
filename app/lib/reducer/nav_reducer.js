import _ from "lodash";
import AppNavigator from "@digihr_lib/navigation/app_navigator";
import { NavigationActions } from "react-navigation";
import { BackHandler } from "react-native";

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams(__APP_START_ROUTE_NAME__, {
    initial: true,
  })
);

export default function reducer(state = initialState, action) {
  if (action.type === 'Navigation/BACK' && state.routes.length === 1) {
    if (_.has(state, 'navigating') && state.navigating) return state;
    BackHandler.exitApp();
  }

  let nextState = null;

  if (action.type === 'UNSET_SCREEN_GO_BACK_PARAMS') {
    // console.log(
    //   "Unsetting go back params for screen key " + action.payload.screenKey
    // );
    // console.log("The route would be:");
    // console.dir(nextState.routes[routeIndex]);

    nextState = {
      ...state,
      routes: _.map(state.routes, route => {
        if (_.isEqual(route.key, action.payload.screenKey)) {
          route.params = _.omit(route.params, [
            'go_back_params',
            'back_navigation_happened',
          ]);
        }
        return route;
      }),
    };

    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.setParams({
        params: {
          backNavParams: {},
        },
        key: action.payload.screenKey,
      }),
      nextState
    );
  } else if (action.type === 'SET_SCREEN_GO_BACK_PARAMS') {
    if (_.has(state, 'navigating') && state.navigating) return state;

    //nextState = AppNavigator.router.getStateForAction(action, state);
    nextState = { ...state };

    if (nextState.index > 0) {
      let routeIndex = -1;

      if (_.has(action, 'payload.routeKey')) {
        routeIndex = _.findIndex(nextState.routes, [
          'key',
          action.payload.routeKey,
        ]);
      } else {
        routeIndex = nextState.index - 1;
      }

      // console.log("Setting go back params for index " + routeIndex);
      // console.log("The route would be:");
      // console.log(nextState.routes[routeIndex]);

      nextState.routes[routeIndex].params['go_back_params'] = action.payload
        .params
        ? { ...action.payload.params }
        : {};
      nextState.routes[routeIndex].params['back_navigation_happened'] = true;

      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.setParams({
          params: {
            backNavParams: {
              params: nextState.routes[routeIndex].params['go_back_params'],
              back_navigation_happened: true,
            },
          },
          key: nextState.routes[routeIndex].key,
        }),
        nextState
      );
    }
  } else if (action.type === 'Navigation/BACK') {
    if (_.has(state, 'navigating') && state.navigating) return state;

    nextState = {
      ...state,
      navigating: true,
    };
    nextState = AppNavigator.router.getStateForAction(action, nextState);
  } else if (action.type === 'Navigation/COMPLETE_TRANSITION') {
    nextState = { ...state };
    nextState.navigating = false;
    nextState.isTransitioning = false;
  } else {
    nextState = AppNavigator.router.getStateForAction(action, state);
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

// const navReducer = (state = initialState, action) => {
//   const nextState = AppNavigator.router.getStateForAction(action, state);

//   // Simply return the original `state` if `nextState` is null or undefined.
//   return nextState || state;
// };

// export default navReducer;
