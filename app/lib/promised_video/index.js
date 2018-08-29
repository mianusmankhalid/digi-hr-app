import React from 'react';
import ReactPromisedComponent from 'react-promised-component';
import Video from 'react-native-af-video-player';
import Youtube from 'react-native-youtube-info';
import { View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import theme from '@digihr_app_config/theme';

const successComponent = props => (
  <Video
    url={
      __DEV_ENV__
        ? props.result.getLowestQualityVideo().url
        : props.result.getHighestQualityVideo().url
    }
    placeholder={props.result.getHighestQualityImage().url}
    logo={props.result.getHighestQualityImage().url}
    onFullScreen={status => props.onFullScreen(status)}
    rotateToFullScreen={true}
    lockPortraitOnFsExit={true}
  />
);

const errorComponent = props => (
  <Icon
    name="refresh"
    size={30}
    color={theme.background.colors.gold}
    onPress={() => props.retry()}
  />
);

const loadingComponent = props => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      flexDirection: 'column',
    }}>
    <ActivityIndicator size="large" color={theme.colors.darkGray} />
  </View>
);

var PromisedReactComponent = ReactPromisedComponent(
  'promise_name',
  loadingComponent,
  errorComponent,
  successComponent
);

export default class PromisedComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  // Promise creator method
  promiseGenerator(params) {
    return Youtube.getVideoInfo(params.youtubeUrl);
  }

  // Method to supply parameters to promise method
  promiseParams() {
    return {
      youtubeUrl: this.props.url,
    };
  }

  render() {
    return (
      <PromisedReactComponent
        promise_name={this.promiseGenerator.bind(this)}
        promise_name_params={this.promiseParams.bind(this)}
        {...this.props}
      />
    );
  }
}
