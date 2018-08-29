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
      screen_params: {
        fullscreen: false,
      },
    };
  }

  componentWillMount() {
    let new_params = { ...this.state.screen_params };
    new_params.headerTitle = I18n.t('message_center');

    this.props.nav_helper.setScreenParams(new_params);
    this.setState({
      screen_params: new_params,
    });
  }

  onFullScreen(status) {
    // Set the params to pass in fullscreen status to navigationOptions
    let new_params = { ...this.state.screen_params };
    new_params.fullscreen = status;

    this.props.nav_helper.setScreenParams(new_params);
    this.setState({
      screen_params: new_params,
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
        onFullScreen={this.onFullScreen.bind(this)}
      />
    );
  }
}

MessageDetailScreen.navigationOptions = ({ navigation }) => {
  const { state } = navigation;

  // get the "deepest" current params.
  const currentParams = NavigationHelper.getCurrentScreenParams(state);
  const header = currentParams && (currentParams.fullscreen ? null : 1);

  if (header === null) {
    return {
      header,
    };
  }

  return {
    headerTitle: currentParams.headerTitle,
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
