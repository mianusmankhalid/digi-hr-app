import styles from './styles';
import images from '@digihr_assets/images';
import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'react-native-i18n';
import _ from 'lodash';
import { showToast } from '@digihr_lib/util/ui';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      password: props.password,
    };
  }

  handleEmail = text => {
    this.setState({ email: text });
  };

  handlePassword = text => {
    this.setState({ password: text });
  };

  performLogin = () => {
    if (_.isEmpty(this.state.email)) {
      this.emailInput.focus();
      return;
    }

    if (!this.props.validateEmail(this.state.email)) {
      showToast(I18n.t('email_not_valid'));
      return;
    }

    if (_.isEmpty(this.state.password)) {
      this.passwordInput.focus();
      return;
    }

    this.props.login(this.state.email, this.state.password);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={images.altLogo} />
          <Text style={styles.title}>{'alt.hr'}</Text>
        </View>
        <View>
          <View style={styles.loginFormContainer}>
            <TextInput
              style={styles.input}
              placeholder={I18n.t('email_address')}
              returnKeyType="next"
              onChangeText={this.handleEmail}
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              ref={input => (this.emailInput = input)}
              value={this.state.email}
            />
            <TextInput
              style={styles.input}
              placeholder={I18n.t('password')}
              secureTextEntry
              returnKeyType="go"
              underlineColorAndroid="transparent"
              ref={input => (this.passwordInput = input)}
              onChangeText={this.handlePassword}
              onSubmitEditing={() => this.performLogin()}
              value={this.state.password}
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.performLogin()}>
              <Text style={styles.buttonText}>{I18n.t('sign_in')}</Text>
            </TouchableOpacity>
            <Text style={styles.text}>
              <Text
                style={styles.hyperLink}
                onPress={() => {
                  this.props.navigateToResetPasswordPage();
                }}>
                {I18n.t('forgot_your_password')}
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.text}>
            {I18n.t('dont_have_an_account')}
            <Text
              style={styles.hyperLink}
              onPress={this.props.navigateToSignupPage}>
              {I18n.t('sign_up')}
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func,
  navigateToSignupPage: PropTypes.func,
  navigateToResetPasswordPage: PropTypes.func,
  validateEmail: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string,
};
