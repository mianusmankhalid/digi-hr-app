import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import MessageCenter from './message_center';
import theme from '@digihr_app_config/theme';
import I18n from 'react-native-i18n';
import NavigationHelper from '@digihr_lib/navigation/helper';
import { getMessageCenter } from './view_controller';

export default class MessageCenterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.props.nav_helper.setScreenParams({
      headerBackTitle: I18n.t('message_center'),
    });
  }

  getMessageCenterData() {
    return getMessageCenter(this.props.nav_helper);
  }

  render() {
    return this.state.isLoading ? (
      <View style={styles.container}>
        <View style={styles.signInMessage}>
          <ActivityIndicator size="large" color={theme.colors.darkGray} />
        </View>
      </View>
    ) : (
      <MessageCenter
        getMessageCenterData={this.getMessageCenterData.bind(this)}
      />
    );
  }
}

MessageCenterScreen.navigationOptions = ({ navigation }) => {
  const { state } = navigation;

  // get the "deepest" current params.
  const currentParams = NavigationHelper.getCurrentScreenParams(state);

  return {
    headerBackTitle: currentParams.headerBackTitle,
    headerTitle: currentParams.headerBackTitle,
  };
};
