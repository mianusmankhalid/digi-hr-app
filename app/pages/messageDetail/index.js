import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import MessageDetail from './message_detail';
import theme from '@digihr_app_config/theme';
import NavigationHelper from '@digihr_lib/navigation/helper';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class MessageDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.props.nav_helper.setScreenParams({
      headerBackTitle: I18n.t('message_center'),
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
      <MessageDetail
        selectedMessageIndex={
          this.props.navigation.state.params.selectedMessageIndex
        }
        messagesData={this.props.navigation.state.params.messagesData}
      />
    );
  }
}

MessageDetailScreen.navigationOptions = ({ navigation }) => {
  const { state } = navigation;

  // get the "deepest" current params.
  const currentParams = NavigationHelper.getCurrentScreenParams(state);

  return {
    headerBackTitle: currentParams.headerBackTitle,
    headerTitle: currentParams.headerBackTitle,
    headerLeft: (
      <View style={{ marginLeft: 10 }}>
        <Icon
          name="close"
          size={30}
          color={theme.background.colors.gold}
          onPress={() => {
            NavigationHelper.onBackButtonPress(navigation);
          }}
        />
      </View>
    ),
  };
};
