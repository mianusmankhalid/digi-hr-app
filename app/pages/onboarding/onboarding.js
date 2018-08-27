import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  WebView,
  ScrollView,
  Dimensions,
} from 'react-native';
import styles from './styles';
import I18n from 'react-native-i18n';
import _ from 'lodash';
import PropTypes from 'prop-types';
import theme from '@digihr_app_config/theme';

const { width } = Dimensions.get('window');

export default class OnboardingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progressWidth: [],
      completedModules: [0],
    };
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
    totalMessages = this.props.onboardingData.length;
    return (
      <View style={{ paddingBottom: 40 }}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {'4/' + totalMessages + ' ' + I18n.t('modules_completed')}
          </Text>
          <View
            style={[
              styles.progressBar,
              { width: (width - 20) / totalMessages * 4 },
            ]}
          />
        </View>
        <ScrollView>
          <View style={styles.messageList}>
            {this.props.onboardingData.map((message, key) => {
              return (
                <View key={key} style={{ marginTop: 5 }}>
                  <View
                    style={[
                      styles.disableContainer,
                      {
                        height: !_.isEqual(message.videoUrl, '')
                          ? 350
                          : !_.isEqual(message.imageUrl, '') ? 300 : 150,
                      },
                      {
                        zIndex: !this.state.completedModules.includes(key)
                          ? 1
                          : 0,
                      },
                    ]}>
                    <Text
                      style={{
                        fontFamily: theme.font.family.muli,
                        color: '#ffffff',
                        fontSize: 10,
                      }}>
                      <Text style={{ fontWeight: '900' }}>
                        {I18n.t('complete_previous_module')}
                      </Text>
                    </Text>
                  </View>
                  {this.renderImageOrVideo(message)}
                  <View style={styles.messageContainer}>
                    <Text style={styles.messageTitleContainer}>
                      <Text style={styles.messageTitle}>{message.title}</Text>
                    </Text>
                    <Text style={styles.messageDescription}>
                      {message.shortDescription}
                    </Text>
                    <Text style={styles.date}>{message.date}</Text>
                    <TouchableOpacity
                      style={styles.viewMoreTouchable}
                      onPress={() => {
                        let currentStatus = this.state.completedModules;
                        !currentStatus.includes(key + 1)
                          ? currentStatus.push(key + 1)
                          : null;
                        this.setState({
                          completedModules: currentStatus,
                        });
                        this.props.onPressViewMore(key);
                      }}>
                      <Text style={styles.viewMore}>{I18n.t('view_more')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

OnboardingPage.propTypes = {
  onPressViewMore: PropTypes.func,
  onboardingData: PropTypes.array,
};
