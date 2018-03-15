import styles from './styles';
import images from '@digihr_assets/images';
import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'react-native-i18n';
import _ from 'lodash';
import { showToast } from '@digihr_lib/util/ui';

export default class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
    };
  }

  handleEmail = text => {
    this.setState({ email: text });
  };

  performResetPassword = () => {
    if (_.isEmpty(this.state.email)) {
      this.emailInput.focus();
      return;
    }

    if (!this.props.validateEmail(this.state.email)) {
      showToast(I18n.t('email_not_valid'));
      return;
    }

    this.props.resetPassword(this.state.email);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={images.altLogo} />
          <Text style={styles.title}>{'alt.hr'}</Text>
        </View>
        <View>
          <View style={styles.resetPasswordContainer}>
            <TextInput
              style={styles.input}
              placeholder={I18n.t('email_address')}
              returnKeyType="next"
              onChangeText={this.handleEmail}
              onSubmitEditing={() => this.performResetPassword()}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              ref={input => (this.emailInput = input)}
              value={this.state.email}
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.performResetPassword}>
              <Text style={styles.buttonText}>{I18n.t('reset_password')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

ResetPasswordPage.propTypes = {
  resetPassword: PropTypes.func,
  validateEmail: PropTypes.func,
  email: PropTypes.string,
  nav_helper: PropTypes.object,
};
