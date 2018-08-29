import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import MessageCenter from './message_center';
import theme from '@digihr_app_config/theme';
import I18n from 'react-native-i18n';
import NavigationHelper from '@digihr_lib/navigation/helper';
import { getMessageCenter } from './view_controller';
import RouteConfig from '@digihr_app_config/routes';

export default class MessageCenterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isMounted: true,
      messageCenterData: [],
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

  componentDidMount() {
    this.getMessageCenterData().then(data => {
      if (this.state.isMounted) {
        this.setState({
          messageCenterData: data,
          isMounted: false,
        });
      }
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

  getMessageCenterData() {
    return getMessageCenter(this.props.nav_helper);
  }

  onPressViewMore(index) {
    this.props.nav_helper.navigate(RouteConfig.Screen.MessageDetail, {
      selectedMessageIndex: index,
      messagesData: this.state.messageCenterData,
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
      <MessageCenter
        messageCenterData={this.state.messageCenterData}
        onPressViewMore={this.onPressViewMore.bind(this)}
        onFullScreen={this.onFullScreen.bind(this)}
      />
    );
  }
}

MessageCenterScreen.navigationOptions = ({ navigation }) => {
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
  };
};
