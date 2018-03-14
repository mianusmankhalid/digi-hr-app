import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import { moveToLoginScreen, resetUserPassword } from './viewController';
import { isEmailValid } from '@digihr_lib/util/email';
import { showToast } from '@digihr_lib/util/ui';
import I18n from 'react-native-i18n';
import ResetPasswordPage from './reset_password_page';
import theme from '@digihr_app_config/theme';
import NavigationHelper from '@digihr_lib/navigation/helper';

export default class ResetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
    };
    this.props.nav_helper.setScreenParams({
      headerBackTitle: I18n.t('password_reset'),
    });
  }

  resetPassword = email => {
    this.setState(
      {
        isLoading: true,
        email: email,
      },
      () => {
        resetUserPassword(email)
          .then(res => {
            showToast(res.message);
            moveToLoginScreen(this.props.nav_helper);
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

  validateEmail(email) {
    return isEmailValid(email);
  }

  render() {
    return this.state.isLoading ? (
      <View style={styles.container}>
        <View style={styles.signInMessage}>
          <ActivityIndicator size="large" color={theme.colors.darkGray} />
        </View>
      </View>
    ) : (
      <ResetPasswordPage
        resetPassword={this.resetPassword.bind(this)}
        validateEmail={this.validateEmail.bind(this)}
        email={this.state.email}
      />
    );
  }
}

ResetPasswordScreen.navigationOptions = ({ navigation }) => {
  const { state } = navigation;

  // get the "deepest" current params.
  const currentParams = NavigationHelper.getCurrentScreenParams(state);

  return {
    headerBackTitle: currentParams.headerBackTitle,
    headerTitle: currentParams.headerBackTitle,
  };
};
