import styles from './styles';
import images from '@digihr_assets/images';
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  CheckBox,
} from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'react-native-i18n';
import _ from 'lodash';

export default class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: props.code,
      checked: false,
    };
  }

  handleCode = text => {
    this.setState({ code: text });
  };

  performSignup = () => {
    if (_.isEmpty(this.state.code)) {
      this.codeInput.focus();
      return;
    }

    this.props.signup(this.state.code);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>{I18n.t('invitation_code')}</Text>
          <TextInput
            style={styles.input}
            placeholder={I18n.t('enter_invitation_code')}
            returnKeyType="go"
            onChangeText={this.handleCode}
            onSubmitEditing={() => this.performSignup()}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            ref={input => (this.codeInput = input)}
            value={this.state.code}
          />
        </View>
        <View style={styles.continueContainer}>
          <View style={styles.agreementView}>
            <View style={styles.agreement}>
              <CheckBox
                value={this.state.checked}
                onValueChange={() =>
                  this.setState({ checked: !this.state.checked })
                }
              />
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.agreementText}>
                  {'I hereby agree that I have read and accepted the '}
                  <Text
                    style={styles.hyperLink}
                    onPress={this.props.navigateToSignupPage}>
                    {'Terms of Use'}
                  </Text>
                  {' and '}
                  <Text
                    style={styles.hyperLink}
                    onPress={this.props.navigateToSignupPage}>
                    {'Privacy Policy'}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.performSignup}>
              <Text style={styles.buttonText}>{I18n.t('continue')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

SignupPage.propTypes = {
  signup: PropTypes.func,
  code: PropTypes.string,
  nav_helper: PropTypes.object,
};
