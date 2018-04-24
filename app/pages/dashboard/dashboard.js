import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import DashboardPage from './dashboard_page';
import theme from '@digihr_app_config/theme';
import {
  moveToMessageCenter,
  getActionCenter,
  getMessageCenter,
  getDashboard,
} from './view_controller';

export default class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  messageCenter() {
    const { screenProps } = this.props;
    moveToMessageCenter(screenProps.navHelper);
  }

  getActionCenterData() {
    const { screenProps } = this.props;
    return getActionCenter(screenProps.navHelper);
  }

  getMessageCenterData() {
    const { screenProps } = this.props;
    return getMessageCenter(screenProps.navHelper);
  }

  getDashboardData() {
    const { screenProps } = this.props;
    return getDashboard(screenProps.navHelper);
  }

  render() {
    return this.state.isLoading ? (
      <View style={styles.container}>
        <View style={styles.signInMessage}>
          <ActivityIndicator size="large" color={theme.colors.darkGray} />
        </View>
      </View>
    ) : (
      <DashboardPage
        messageCenter={this.messageCenter.bind(this)}
        getActionCenterData={this.getActionCenterData.bind(this)}
        getMessageCenterData={this.getMessageCenterData.bind(this)}
        getDashboardData={this.getDashboardData.bind(this)}
      />
    );
  }
}
