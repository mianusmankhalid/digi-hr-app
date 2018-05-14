import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { BackHandler } from 'react-native';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import React, { Component } from 'react';
import Store from '@digihr_lib/store';
import AppNavigator from '@digihr_lib/navigation/app_navigator';
import * as DigiNavActions from '@digihr_lib/actions/digi_nav_actions';

const addListener = createReduxBoundAddListener('root');

class App extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { nav, dispatch } = this.props;
    if (nav.index === 0) {
      return false;
    }

    dispatch(DigiNavActions.setGoBackScreenParams());
    dispatch(NavigationActions.back());
    return true;
  };

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
