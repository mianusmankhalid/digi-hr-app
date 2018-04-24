import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  WebView,
  ScrollView,
} from 'react-native';
import styles from './styles';
import I18n from 'react-native-i18n';
import _ from 'lodash';
import PropTypes from 'prop-types';

export default class MessageCenterPage extends Component {
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
      <ScrollView>
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
                      ? message.description.slice(0, 147) + '...'
                      : message.description}
                  </Text>
                  <Text style={styles.date}>{message.date}</Text>
                  <TouchableHighlight
                    style={styles.viewMoreTouchable}
                    onPress={() => this.props.onPressViewMore(key)}>
                    <Text style={styles.viewMore}>{I18n.t('view_more')}</Text>
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
};
