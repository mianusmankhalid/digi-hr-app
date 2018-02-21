import { combineReducers } from 'redux';

import navigationReducer from './nav_reducer';

export default combineReducers({
  navigation: navigationReducer,
});
