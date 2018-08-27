import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import Onboarding from './onboarding';
import theme from '@digihr_app_config/theme';
import { getOnboarding } from './view_controller';
import RouteConfig from '@digihr_app_config/routes';

export default class OnboardingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      onboardingData: [],
    };
  }

  componentDidMount() {
    this.getOnboardingData().then(data => {
      console.log(data);
      this.setState({
        onboardingData: data,
      });
    });
  }

  getOnboardingData() {
    return getOnboarding();
  }

  onPressViewMore(index) {
    const { screenProps } = this.props;
    screenProps.navHelper.navigate(RouteConfig.Screen.OnboardingDetail, {
      selectedMessageIndex: index,
      messagesData: this.state.onboardingData,
      messageTitle: 'ONBOARDING',
    });
  }

  render() {
    return this.state.isLoading ? (
      <View style={styles.container}>
        <View style={styles.signInMessage}>
          <ActivityIndicator size="large" color={theme.colors.darkGray} />
        </View>
      </View>
    ) : (
      <Onboarding
        onboardingData={this.state.onboardingData}
        onPressViewMore={this.onPressViewMore.bind(this)}
      />
    );
  }
}
