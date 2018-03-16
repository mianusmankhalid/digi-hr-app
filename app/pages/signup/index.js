import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import {
  moveToSignupVerification,
  signupInvitationCode,
} from './viewController';
import { showToast } from '@digihr_lib/util/ui';
import I18n from 'react-native-i18n';
import SignupPage from './signup_page';
import theme from '@digihr_app_config/theme';
import NavigationHelper from '@digihr_lib/navigation/helper';

export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      code: '',
    };
    this.props.nav_helper.setScreenParams({
      headerBackTitle: I18n.t('sign_up').toUpperCase(),
    });
  }

  signup = code => {
    this.setState(
      {
        isLoading: true,
        code: code,
      },
      () => {
        signupInvitationCode(code)
          .then(() => {
            moveToSignupVerification(this.props.nav_helper);
          })
          .catch(error => {
            showToast(error.message);
            this.setState({
              isLoading: false,
            });
          });
      }
    );
  };

  render() {
    return this.state.isLoading ? (
      <View style={styles.container}>
        <View style={styles.signInMessage}>
          <ActivityIndicator size="large" color={theme.colors.darkGray} />
        </View>
      </View>
    ) : (
      <SignupPage signup={this.signup.bind(this)} code={this.state.code} />
    );
  }
}

SignupScreen.navigationOptions = ({ navigation }) => {
  const { state } = navigation;

  // get the "deepest" current params.
  const currentParams = NavigationHelper.getCurrentScreenParams(state);

  return {
    headerBackTitle: currentParams.headerBackTitle,
    headerTitle: currentParams.headerBackTitle,
  };
};
