import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import React, { Component } from 'react';
import Store from '@digihr_lib/store';
import AppNavigator from '@digihr_lib/navigation/app_navigator';

const addListener = createReduxBoundAddListener('root');

class App extends Component {
  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
          addListener,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.navigation,
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export default class Root extends Component {
  render() {
    return (
      <Provider store={Store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
