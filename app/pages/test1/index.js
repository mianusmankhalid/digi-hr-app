import React, { Component } from 'react';
import { View, Text } from 'react-native';
import NavigationHelper from '@digihr_lib/navigation/helper';
import Video, { ScrollView, Container } from 'react-native-af-video-player';
import Youtube from 'react-native-youtube-info';
import VideoComponent from '@digihr_lib/video';

export default class TestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen_params: {
        fullscreen: false,
      },
      videoUrl: null,
    };
  }

  componentWillMount() {
    let new_params = { ...this.state.screen_params };
    new_params.headerTitle = 'Saada Khushbu';

    this.props.nav_helper.setScreenParams(new_params);
    this.setState({
      screen_params: new_params,
      url: null,
      placeholder: null,
    });

    Youtube.getVideoInfo('2MpUj-Aua48').then(result => {
      this.setState({
        url: result.getLowestQualityVideo().url,
        placeholder: result.getHighestQualityImage().url,
      });
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
    return (
      <ScrollView style={{ flex: 1 }}>
        <Text>{'Text message'}</Text>
        <Container>
          {this.state.url != null ? (
            <VideoComponent
              url={this.state.url}
              placeholder={this.state.placeholder}
              onFullScreen={() => this.onFullScreen.bind(this)}
            />
          ) : (
            <View />
          )}
        </Container>
        {this.state.url != null ? (
          <VideoComponent
            style={{ position: 'absolute', zIndex: 1 }}
            url={this.state.url}
            placeholder={this.state.placeholder}
            onFullScreen={() => this.onFullScreen.bind(this)}
          />
        ) : (
          <View />
        )}
        <Text>{'Text message'}</Text>
      </ScrollView>
    );
  }
}

TestScreen.navigationOptions = ({ navigation }) => {
  const { state } = navigation;

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
