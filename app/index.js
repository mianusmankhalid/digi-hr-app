import { createReduxBoundAddListener } from "react-navigation-redux-helpers";
import { BackHandler } from "react-native";
import { NavigationActions } from "react-navigation";
import { Provider, connect } from "react-redux";
import React, { Component } from "react";
import Store from "@digihr_lib/store";
import AppNavigator from "@digihr_lib/navigation/app_navigator";
import * as DigiNavActions from "@digihr_lib/actions/digi_nav_actions";

const addListener = createReduxBoundAddListener("root");

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { nav, dispatch } = this.props;
    if (nav.index === 0) {
      //BackHandler.exitApp();
      //return true;

      return false;
    }

    dispatch(DigiNavActions.setGoBackScreenParams());
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation={{
          dispatch,
          state: nav,
          addListener
        }}
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
