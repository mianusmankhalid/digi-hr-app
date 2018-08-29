import React, { Component } from 'react';
import Video from 'react-native-af-video-player';

export default class VideoComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Video
        url={this.props.url}
        rotateToFullScreen={true}
        lockPortraitOnFsExit={true}
        placeholder={this.props.placeholder}
        logo={this.props.placeholder}
        onFullScreen={status => this.props.onFullScreen(status)}
      />
    );
  }
}
