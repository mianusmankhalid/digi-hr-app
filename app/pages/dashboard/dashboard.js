import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import I18n from 'react-native-i18n';
import DashboardPage from './dashboard_page';
import theme from '@digihr_app_config/theme';
import NavigationHelper from '@digihr_lib/navigation/helper';
import { moveToMessageCenter } from './viewController';

export default class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.props.nav_helper.setScreenParams({
      headerBackTitle: I18n.t('dashboard'),
    });
  }

  messageCenter = () => {
    moveToMessageCenter(this.props.nav_helper);
  };

  render() {
    return this.state.isLoading ? (
      <View style={styles.container}>
        <View style={styles.signInMessage}>
          <ActivityIndicator size="large" color={theme.colors.darkGray} />
        </View>
      </View>
    ) : (
      <DashboardPage messageCenter={this.messageCenter.bind(this)} />
    );
  }
}

DashboardScreen.navigationOptions = ({ navigation }) => {
  const { state } = navigation;

  // get the "deepest" current params.
  const currentParams = NavigationHelper.getCurrentScreenParams(state);

  return {
    headerBackTitle: currentParams.headerBackTitle,
    headerTitle: currentParams.headerBackTitle,
    headerLeft: null,
  };
};
