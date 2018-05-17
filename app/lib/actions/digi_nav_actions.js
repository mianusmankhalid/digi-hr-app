import _ from 'lodash';

export function setGoBackScreenParams(routeKey = null, params = null) {
  let payload = {};
  if (!_.isEmpty(routeKey)) {
    payload.routeKey = routeKey;
  }

  if (!_.isEmpty(params)) {
    payload.params = params;
  }

  return {
    type: 'SET_SCREEN_GO_BACK_PARAMS',
    payload: { ...payload },
  };
}

// export function tryGoingBack(routeKey = null, params = null) {
//   let payload = {};
//   if (!_.isEmpty(routeKey)) {
//     payload.routeKey = routeKey;
//   }

//   if (!_.isEmpty(params)) {
//     payload.params = params;
//   }

//   return {
//     type: 'MOVE_BACK_IF_POSSIBLE',
//     payload: { ...payload },
//   };
// }