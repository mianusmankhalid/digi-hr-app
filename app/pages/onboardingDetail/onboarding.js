import React, { Component } from 'react';
import { View, Image, Text, WebView, ScrollView } from 'react-native';
import styles from './styles';
import _ from 'lodash';
import PropTypes from 'prop-types';
import CollapseView from 'react-native-collapse-view';
import Icon from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import theme from '@digihr_app_config/theme';

export default class Onboarding extends Component {
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

  _renderIconView = collapse => {
    return (
      <View style={styles.iconView}>
        <Text style={styles.font}>
          <Text style={styles.moreVideosTitle}>{'More videos'}</Text>
        </Text>
        <View>
          {collapse ? (
            <Icon name="chevron-up" size={35} />
          ) : (
            <Icon name="chevron-down" size={35} />
          )}
        </View>
      </View>
    );
  };

  _renderCollapseView = () => {
    return (
      <View style={styles.collapseView}>
        <View style={styles.videoLink}>
          <Icon name="play" size={30} />
          <Text style={[styles.font, { paddingLeft: 5, fontSize: 16 }]}>
            {'Albern Murty on Digi values'}
          </Text>
          <MaterialIcons
            style={{ position: 'absolute', top: 10, right: 60 }}
            name="check"
            size={20}
          />
          <Text
            style={[styles.font, { position: 'absolute', top: 10, right: 15 }]}>
            {'2m 7s'}
          </Text>
        </View>
        <View style={styles.videoLink}>
          <Icon name="play" size={30} />
          <Text style={[styles.font, { paddingLeft: 5, fontSize: 16 }]}>
            <Text style={{ fontWeight: '900' }}>{'Message from the CEO'}</Text>
          </Text>
          <Text
            style={[styles.font, { position: 'absolute', top: 10, right: 15 }]}>
            <Text style={{ fontWeight: '900' }}>{'1m 6s'}</Text>
          </Text>
        </View>
        <View style={styles.videoLink}>
          <Icon name="play" size={30} />
          <Text style={[styles.font, { paddingLeft: 5, fontSize: 16 }]}>
            {'Culture at Digi'}
          </Text>
          {/* <MaterialIcons
            style={{ position: 'absolute', top: 10, right: 60 }}
            name="check"
            size={20}
          /> */}
          <Text
            style={[styles.font, { position: 'absolute', top: 10, right: 15 }]}>
            {'1m 6s'}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={styles.message}>
        {this.renderImageOrVideo(this.props.data)}
        <Text style={styles.messageTitleContainer}>
          <Text style={styles.messageTitle}>{this.props.data.title}</Text>
        </Text>
        <Text style={styles.messageDescription}>
          {this.props.data.description}
        </Text>
        <CollapseView
          collapse={true}
          renderView={this._renderIconView}
          renderCollapseView={this._renderCollapseView}
        />
      </ScrollView>
    );
  }
}

Onboarding.propTypes = {
  data: PropTypes.object,
};
