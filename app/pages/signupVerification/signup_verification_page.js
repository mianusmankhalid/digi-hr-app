import styles from './styles';
import React, { Component } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'react-native-i18n';
import _ from 'lodash';
import theme from '@digihr_app_config/theme';

export default class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icPassport: props.icPassport,
      password: props.password,
      confirmPassword: props.confirmPassword,
      isBiometricChecked: props.isBiometricChecked,
    };
  }

  handleIcPassport = text => {
    this.setState({ icPassport: text });
  };

  handlePassword = text => {
    this.setState({ password: text });
  };

  handleConfirmPassword = text => {
    this.setState({ confirmPassword: text });
  };

  performSignupVerification = () => {
    if (_.isEmpty(this.state.icPassport)) {
      this.icPassportInput.focus();
      return;
    }

    if (_.isEmpty(this.state.password)) {
      this.passwordInput.focus();
      return;
    }

    if (_.isEmpty(this.state.confirmPassword)) {
      this.confirmPasswordInput.focus();
      return;
    }

    this.props.signupVerification(
      this.state.icPassport,
      this.state.password,
      this.state.isBiometricChecked
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.groupContainer}>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>{I18n.t('ic_passport_number')}</Text>
              <TextInput
                style={styles.input}
                placeholder={I18n.t('enter_ic_passport')}
                returnKeyType="next"
                onChangeText={this.handleIcPassport}
                onSubmitEditing={() => this.passwordInput.focus()}
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                ref={input => (this.icPassportInput = input)}
                value={this.state.icPassport}
              />
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>
                {I18n.t('password').toUpperCase()}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={I18n.t('alphanumeric_password')}
                secureTextEntry
                returnKeyType="next"
                onChangeText={this.handlePassword}
                onSubmitEditing={() => this.confirmPasswordInput.focus()}
                underlineColorAndroid="transparent"
                ref={input => (this.passwordInput = input)}
                value={this.state.password}
              />
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>{I18n.t('confirm_password')}</Text>
              <TextInput
                style={styles.input}
                placeholder={I18n.t('reenter_password')}
                secureTextEntry
                returnKeyType="next"
                onChangeText={this.handleConfirmPassword}
                underlineColorAndroid="transparent"
                ref={input => (this.confirmPasswordInput = input)}
                value={this.state.confirmPassword}
              />
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.switchContainer}>
              <Text style={styles.switchTitle}>
                {I18n.t('enable_biometric')}
              </Text>
              <Switch
                value={this.state.isBiometricChecked}
                onValueChange={() =>
                  this.setState({
                    isBiometricChecked: !this.state.isBiometricChecked,
                  })
                }
                onTintColor={theme.background.colors.gold}
                thumbTintColor={theme.background.colors.white}
              />
            </View>
          </View>
        </View>
        <View style={styles.continueContainer}>
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.performSignupVerification}>
              <Text style={styles.buttonText}>{I18n.t('continue')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

SignupPage.propTypes = {
  signupVerification: PropTypes.func,
  icPassport: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  isBiometricChecked: PropTypes.bool,
  nav_helper: PropTypes.object,
};
