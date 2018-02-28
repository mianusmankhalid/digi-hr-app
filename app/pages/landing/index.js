import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import RouteConfig from '@digihr_app_config/routes';
import Splash from './splash';

export default class LandingPage extends Component {
  backNavigationDidHappen(params) {
    // console.log('Yes navigation back happened on LandingPage!');
    // console.dir(params);
  }

  render() {
    return (
      <View style={styles.container}>
        <Splash />
        <Button
          title="Move To Page 2"
          onPress={() => {
            this.props.nav_helper.navigate(RouteConfig.Screen.PageTwo);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1
  }
});