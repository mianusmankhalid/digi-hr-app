import React, { Component } from 'react';
import { View, Image, Text, WebView, ScrollView } from 'react-native';
import styles from './styles';
import _ from 'lodash';
import PropTypes from 'prop-types';

export default class Message extends Component {
  constructor(props) {
    super(props);
  }

  renderImageOrVideo(message) {
    if (!_.isEqual(message.videoUrl, '')) {
      return (
        <View style={styles.messageHeader}>
          <View style={styles.videoContainer}>
            <WebView
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{
                uri:
                  message.videoUrl +
                  '?version=3&enablejsapi=1&rel=0&autoplay=1&showinfo=0&controls=1&modestbranding=0',
              }}
            />
          </View>
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
      <ScrollView style={styles.message}>
        {this.renderImageOrVideo(this.props.data)}
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
};
