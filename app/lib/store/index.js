import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import Thunk from 'redux-thunk';
import PromiseMiddleware from 'redux-promise-middleware';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import Reducer from '@digihr_lib/reducer';
import ScreenTracking from './middleware/screen_tracking';
import SerializeError from 'serialize-error';
import { isDebuggingEnabled } from '@digihr_lib/dev_helper';
import _ from 'lodash';

const error = store => next => action => {
  try {
    next(action);
  } catch (e) {
    if (isDebuggingEnabled()) {
      // Handle error!
      if (_.includes(__APP_ERROR_NAMES__, e.name)) {
        console.log(
          '%c ======== ' + e.name + ' BEGIN ============',
          'background: #222; color: #bada55'
        );
        console.dir(e);
        console.log(
          '%c ======== ' + e.name + 'END ============',
          'background: #222; color: #bada55'
        );
      }
    }

    analytics.trackException(SerializeError(e), true);
    throw e;
  }
};

// Uncomment the lines below to start with modification of the landing screen
// import AlterAppStart from './middleware/alter_app_start';
const middleware = applyMiddleware(
  ScreenTracking,
  PromiseMiddleware(),
  Thunk,
  createLogger({}),
  error,
  createReactNavigationReduxMiddleware('root', state => state.navigation)
  // AlterAppStart
);

export default createStore(Reducer, middleware);
