import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import NavigationHelper from '@digihr_lib/navigation/helper';

export default class PageTwo extends Component {
  constructor(props) {
    super(props);
    this.props.nav_helper.setScreenParams({
      headerBackTitle: 'BackToPage1',
    });
  }

  render() {
    return (
      <View>
        <Text>{'Here We Are On Page 2'}</Text>
        <Button
          title="Go Back"
          onPress={() => {
            this.props.nav_helper.goBack();
          }}
        />
      </View>
    );
  }
}

PageTwo.navigationOptions = function({ navigation, screenProps }) {
  const { state, setParams } = navigation;

  // get the "deepest" current params.
  const currentParams = NavigationHelper.getCurrentScreenParams(state);

  return {
    headerBackTitle: currentParams.headerBackTitle,
    headerTitle: currentParams.headerBackTitle,
  };
};
