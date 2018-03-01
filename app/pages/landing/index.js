import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import RouteConfig from '@digihr_app_config/routes';

export default class LandingPage extends Component {
  backNavigationDidHappen(params) {
    // console.log('Yes navigation back happened on LandingPage!');
    // console.dir(params);
  }

  render() {
    return (
      <View>
        <Text>{'Amir Ali Jiwani'}</Text>
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
