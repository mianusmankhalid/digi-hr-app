import React, { Component } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import styles from "./styles";
import {
  moveToNextScreen,
  loginUser,
  moveToResetPassword,
  moveToSignup
} from "./viewController";
import { isEmailValid } from "@digihr_lib/util/helper";
import { showToast } from "@digihr_lib/util/ui";
import I18n from "react-native-i18n";
import LoginPage from "./login_page";
import theme from "@digihr_app_config/theme";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: "",
      password: "",
      imageUri: ""
    };
  }

  navigateToSignupPage = () => {
    moveToSignup(this.props.nav_helper);
  };

  navigateToResetPasswordPage = () => {
    moveToResetPassword(this.props.nav_helper);
  };

  login = (email, password) => {
    // Finally if everything is perfect, try loggin in the user
    this.setState(
      {
        isLoading: true,
        email: email,
        password: password
      },
      () => {
        loginUser(email, password)
          .then(() => {
            moveToNextScreen(this.props.nav_helper);
          })
          .catch(() => {
            showToast(I18n.t("incorrect_email_password"));
            this.setState({
              isLoading: false
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
          <Text>{I18n.t("logging_you_in")}</Text>
        </View>
      </View>
    ) : (
      <LoginPage
        login={this.login.bind(this)}
        navigateToSignupPage={this.navigateToSignupPage.bind(this)}
        navigateToResetPasswordPage={this.navigateToResetPasswordPage.bind(
          this
        )}
        validateEmail={this.validateEmail.bind(this)}
        email={this.state.email}
        password={this.state.password}
      />
    );
  }
}
