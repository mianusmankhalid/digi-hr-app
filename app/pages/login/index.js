import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import images from '@digihr_assets/images';
import RouteConfig from '@digihr_app_config/routes';
import styles from './styles';
import { letUserIn } from './viewController';

export default class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
  };

  handleEmail = text => {
    this.setState({ email: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };

  login = (email, password) => {
    if (email === '') {
      this.emailInput.focus();
      return;
    }
    if (!this.validateEmail(email)) {
      ToastAndroid.show('email is not valid', ToastAndroid.SHORT);
      return;
    }
    if (password === '') {
      this.passwordInput.focus();
      return;
    }
    letUserIn(email, password, this.props.nav_helper);
  };

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={images.altLogo} />
          <Text style={styles.title}>{'alt.hr'}</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.loginFormContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email address"
              returnKeyType="next"
              onChangeText={this.handleEmail}
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              ref={input => (this.emailInput = input)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              returnKeyType="go"
              underlineColorAndroid="transparent"
              ref={input => (this.passwordInput = input)}
              onChangeText={this.handlePassword}
              onSubmitEditing={() =>
                this.login(this.state.email, this.state.password)
              }
            />
            <TouchableOpacity style={styles.buttonContainer}>
              <Text
                style={styles.buttonText}
                onPress={() =>
                  this.login(this.state.email, this.state.password)
                }>
                {'SIGN IN'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.text}>
              <Text
                style={styles.hyperLink}
                onPress={() => {
                  this.props.nav_helper.navigate(
                    RouteConfig.Screen.ResetPassword
                  );
                }}>
                {'Forgot your password?'}
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.text}>
            {"Don't have an account? "}
            <Text
              style={styles.hyperLink}
              onPress={() => {
                this.props.nav_helper.navigate(RouteConfig.Screen.Signup);
              }}>
              {'Sign up'}
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}
