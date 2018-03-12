import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
// import Splash from './splash';
import { letUserIn } from './viewController';
const timer = require('react-native-timer');
import RouteConfig from '@digihr_app_config/routes';

export default class LandingPage extends Component {
  timerOver() {
    letUserIn(this.props.nav_helper);
  }

  componentDidMount() {
    timer.setTimeout('letUserIn', this.timerOver.bind(this), 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.nav_helper.navigate(RouteConfig.Screen.Splash)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
