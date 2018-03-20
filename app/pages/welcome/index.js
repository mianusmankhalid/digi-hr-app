import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import theme from '@digihr_app_config/theme';
import I18n from 'react-native-i18n';
import { welcomePageDetails, moveToDashboard } from './viewController';

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      welcomeText: '',
      logoUrl: '',
      backgroundImageUrl: '',
    };
  }

  componentDidMount() {
    welcomePageDetails()
      .then(val =>
        this.setState({
          isLoading: false,
          welcomeText: val.welcomeText,
          logoUrl: val.logoUrl,
          backgroundImageUrl: val.backgroundImageUrl,
        })
      )
      .catch(error => {
        showToast(error.message);
        this.setState({
          isLoading: false,
        });
      });
  }

  navigateToDashboard = () => {
    this.setState(
      {
        welcomeText: '',
        logoUrl: '',
        backgroundImageUrl: '',
      },
      () => {
        moveToDashboard(this.props.nav_helper);
      }
    );
  };

  render() {
    return this.state.isLoading ? (
      <View style={styles.container}>
        <View>
          <ActivityIndicator size="large" color={theme.colors.darkGray} />
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: this.state.backgroundImageUrl }}
          />
        </View>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={{ uri: this.state.logoUrl }} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{this.state.welcomeText}</Text>
        </View>
        <View style={styles.continueContainer}>
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.navigateToDashboard}>
              <Text style={styles.buttonText}>{I18n.t('continue')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
