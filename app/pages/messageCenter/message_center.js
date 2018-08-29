import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView
} from "react-native";
import styles from "./styles";
import I18n from "react-native-i18n";
import _ from "lodash";
import PropTypes from "prop-types";
import PromisedVideo from "@digihr_lib/promised_video";

export default class MessageCenterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false,
    };
  }

  onFullScreen(status) {
    this.setState({
      isFullScreen: status,
    });
    this.props.onFullScreen(status);
  }

  // The event 'ev' is of type 'GestureResponderEvent'. Documentation for ev.nativeEvent:
    // https://facebook.github.io/react-native/docs/gesture-responder-system.html
    onTouchEvent(name, ev) {
      console.log(
          `[${name}] ` + 
          `root_x: ${ev.nativeEvent.pageX}, root_y: ${ev.nativeEvent.pageY} ` +
          `target_x: ${ev.nativeEvent.locationX}, target_y: ${ev.nativeEvent.locationY} ` + 
          `target: ${ev.nativeEvent.target}`
      );
  }

  renderImageOrVideo(message) {
    if (!_.isEqual(message.videoUrl, '')) {
      return (
        <View
          onStartShouldSetResponder={() => true}
          onResponderGrant={this.onTouchEvent.bind(this, 'onResponderGrant')}>
          <PromisedVideo
            url={message.videoUrl}
            onFullScreen={this.onFullScreen.bind(this)}
          />
        </View>
      );
    } else if (!_.isEqual(message.imageUrl, '')) {
      return (
        <View style={styles.messageHeader}>
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
    return (
      <ScrollView style={{ flex: 1 }} scrollEnabled={!this.state.isFullScreen}>
        <View style={styles.messageList}>
          {this.props.messageCenterData.map((message, key) => {
            return (
              <View key={key} style={{ marginTop: 10 }}>
                {this.renderImageOrVideo(message)}
                <View style={styles.messageContainer}>
                  <Text style={styles.messageTitleContainer}>
                    <Text style={styles.messageTitle}>{message.title}</Text>
                  </Text>
                  <Text style={styles.messageDescription}>
                    {message.description.length > 150
                      ? message.description.slice(0, 147) + "..."
                      : message.description}
                  </Text>
                  <Text style={styles.date}>{message.date}</Text>
                  <TouchableHighlight
                    style={styles.viewMoreTouchable}
                    onPress={() => this.props.onPressViewMore(key)}
                  >
                    <Text style={styles.viewMore}>{I18n.t("view_more")}</Text>
                  </TouchableHighlight>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

MessageCenterPage.propTypes = {
  onPressViewMore: PropTypes.func,
  messageCenterData: PropTypes.array,
  onFullScreen: PropTypes.func,
};
