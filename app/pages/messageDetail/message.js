import React, { Component } from "react";
import { View, Image, Text, ScrollView, Dimensions } from "react-native";
import styles from "./styles";
import _ from "lodash";
import PropTypes from "prop-types";
import PromisedVideo from "@digihr_lib/promised_video";

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false
    };
  }

  onFullScreen(status) {
    this.setState({
      isFullScreen: status
    });
    this.props.onFullScreenHideDots(status);
    this.props.onFullScreen(status);
  }

  renderImageOrVideo(message, width) {
    if (!_.isEqual(message.videoUrl, "")) {
      return (
        <View style={[styles.videoContainer, { width: width }]}>
          <PromisedVideo
            url={message.videoUrl}
            onFullScreen={this.onFullScreen.bind(this)}
          />
        </View>
      );
    } else if (!_.isEqual(message.imageUrl, "")) {
      return (
        <View style={[styles.messageHeader, { width: width }]}>
          <Image
            style={styles.imageContainer}
            source={{
              uri: message.imageUrl,
            }}
          />
        </View>
      );
    }
  }

  render() {
    const { width } = Dimensions.get("window");
    return (
      <ScrollView
        style={[styles.message, { width: width }]}
        scrollEnabled={!this.state.isFullScreen}>
        {this.renderImageOrVideo(this.props.data, width)}
        <Text style={styles.messageTitleContainer}>
          <Text style={styles.messageTitle}>{this.props.data.title}</Text>
        </Text>
        <Text style={styles.date}>{this.props.data.date}</Text>
        <Text style={styles.messageDescription}>
          {this.props.data.description}
        </Text>
      </ScrollView>
    );
  }
}

Message.propTypes = {
  data: PropTypes.object,
  onFullScreen: PropTypes.func,
  onFullScreenHideDots: PropTypes.func
};
