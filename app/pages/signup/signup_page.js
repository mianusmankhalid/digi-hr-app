import styles from './styles';
import React, { Component } from 'react';
import {
  View,
  Text,
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
      isPolicyChecked: props.isPolicyChecked,
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

    if (_.isEqual(false, this.state.isPolicyChecked)) {
      return;
    }

    this.props.signup(this.state.code, this.state.isPolicyChecked);
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
          <View style={styles.agreementView}>
            <View style={styles.agreement}>
              <CheckBox
                value={this.state.isPolicyChecked}
                onValueChange={() =>
                  this.setState({
                    isPolicyChecked: !this.state.isPolicyChecked,
                  })
                }
              />
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.agreementText}>
                  {'I hereby agree that I have read and accepted the '}
                  <Text style={styles.hyperLink} onPress={this.props.policies}>
                    {'Terms of Use and Privacy Policy'}
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
  policies: PropTypes.func,
  code: PropTypes.string,
  isPolicyChecked: PropTypes.bool,
  nav_helper: PropTypes.object,
};
