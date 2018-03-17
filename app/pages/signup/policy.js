import React, { Component } from 'react';
import { WebView } from 'react-native';
import NavigationHelper from '@digihr_lib/navigation/helper';
import I18n from 'react-native-i18n';

export default class Policy extends Component {
  constructor(props) {
    super(props);
    this.props.nav_helper.setScreenParams({
      headerBackTitle: I18n.t('policies').toUpperCase(),
    });
  }
  render() {
    return (
      <WebView
        source={{ uri: 'https://alt.hr/policy' }}
        javaScriptEnabled={true}
      />
    );
  }
}

Policy.navigationOptions = ({ navigation }) => {
  const { state } = navigation;

  // get the "deepest" current params.
  const currentParams = NavigationHelper.getCurrentScreenParams(state);

  return {
    headerBackTitle: currentParams.headerBackTitle,
    headerTitle: currentParams.headerBackTitle,
  };
};
