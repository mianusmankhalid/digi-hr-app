import React, { Component } from 'react';
import styles from './styles';
import { moveToNextScreen, resetUserPassword } from './viewController';
import { isEmailValid } from '@digihr_lib/util/email';
import { showToast } from '@digihr_lib/util/ui';
import I18n from 'react-native-i18n';
import ResetPasswordPage from './reset_password_page';
import NavigationHelper from '@digihr_lib/navigation/helper';

export default class ResetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.props.nav_helper.setScreenParams({
      headerBackTitle: I18n.t('password_reset'),
    });
  }

  resetPassword = email => {
    // Finally if everything is perfect, try loggin in the user
    this.setState(
      {
        email: email,
      },
      () => {
        resetUserPassword(email)
          .then(() => {
            moveToNextScreen(this.props.nav_helper);
          })
          .catch(() => {
            showToast(I18n.t('something_went_wrong'));
          });
      }
    );
  };

  validateEmail(email) {
    return isEmailValid(email);
  }

  render() {
    return (
      <ResetPasswordPage
        resetPassword={this.resetPassword.bind(this)}
        validateEmail={this.validateEmail.bind(this)}
        email={this.state.email}
      />
    );
  }
}

ResetPasswordScreen.navigationOptions = ({ navigation, screenProps }) => {
  const { state, setParams } = navigation;

  // get the "deepest" current params.
  const currentParams = NavigationHelper.getCurrentScreenParams(state);

  return {
    headerBackTitle: currentParams.headerBackTitle,
    headerTitle: currentParams.headerBackTitle,
  };
};
