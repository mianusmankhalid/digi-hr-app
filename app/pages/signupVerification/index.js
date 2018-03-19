import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import { moveToWelcome, signupVerificationDetails } from './viewController';
import { showToast } from '@digihr_lib/util/ui';
import { isPasswordValid } from '@digihr_lib/util/helper';
import I18n from 'react-native-i18n';
import SignupVerificationPage from './signup_verification_page';
import theme from '@digihr_app_config/theme';
import NavigationHelper from '@digihr_lib/navigation/helper';

export default class SignupVerificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      icPassport: '',
      password: '',
      isBiometric: true,
    };
    this.props.nav_helper.setScreenParams({
      headerBackTitle: I18n.t('verification').toUpperCase(),
    });
  }

  signupVerification = (icPassport, password, isBiometric) => {
    this.setState(
      {
        isLoading: true,
        icPassport: '',
        password: '',
        isBiometric: true,
      },
      () => {
        signupVerificationDetails(icPassport, password, isBiometric)
          .then(() => {
            moveToWelcome(this.props.nav_helper);
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

  isPasswordMeetRequirement(password) {
    return isPasswordValid(password);
  }

  render() {
    return this.state.isLoading ? (
      <View style={styles.container}>
        <View style={styles.signInMessage}>
          <ActivityIndicator size="large" color={theme.colors.darkGray} />
        </View>
      </View>
    ) : (
      <SignupVerificationPage
        signupVerification={this.signupVerification.bind(this)}
        isPasswordMeetRequirement={this.isPasswordMeetRequirement.bind(this)}
        icPassport={this.state.icPassport}
        password={this.state.password}
        isBiometric={this.state.isBiometric}
      />
    );
  }
}

SignupVerificationScreen.navigationOptions = ({ navigation }) => {
  const { state } = navigation;

  // get the "deepest" current params.
  const currentParams = NavigationHelper.getCurrentScreenParams(state);

  return {
    headerBackTitle: currentParams.headerBackTitle,
    headerTitle: currentParams.headerBackTitle,
  };
};
