export function setGoBackScreenParams(screenName, params) {
  return {
    type: 'SET_SCREEN_GO_BACK_PARAMS',
    payload: {
      screenName: screenName,
      params: params,
    },
  };
}

export function consumeGoBackScreenParams(screenKey) {
  return {
    type: 'UNSET_SCREEN_GO_BACK_PARAMS',
    payload: {
      screenKey: screenKey,
    },
  };
}

export function setNavigatingBack(screenName) {
  return {
    type: 'SET_BACK_NAVIGATION_HAPPENED',
    payload: {
      screenName: screenName,
    },
  };
}
