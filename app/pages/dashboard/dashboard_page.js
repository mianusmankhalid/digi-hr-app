import React, { Component } from 'react';
import {
  ListView,
  View,
  Text,
  Animated,
  TextInput,
  Image,
  PanResponder,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Row from './row';
import data from './data';
import styles from './styles';
import images from '@digihr_assets/images';
import I18n from 'react-native-i18n';

const SEARCHBAR_HEIGHT = 60;
const MESSAGECENTER_HEIGHT = 100;
const AnimatedListView = Animated.createAnimatedComponent(ListView);

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);
    this.state = {
      chatbot: '',
      dropZoneValues: null,
      pan: new Animated.ValueXY(),
      dataSource: ds.cloneWithRows(data),
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim
        ),
        0,
        SEARCHBAR_HEIGHT
      ),
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: 0,
          dy: this.state.pan.y,
        },
      ]),
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropZone(gesture)) {
          this.props.messageCenter();
        }
        Animated.spring(this.state.pan, { toValue: { x: 0, y: 0 } }).start();
      },
    });
  }

  handleChatbot = text => {
    this.setState({ chatbot: text });
  };

  isDropZone(gesture) {
    var dz = this.state.dropZoneValues;
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height + 200;
  }

  setDropZoneValues(event) {
    this.setState({
      dropZoneValues: event.nativeEvent.layout,
    });
  }
  getStyle = () => {
    return [
      {
        opacity: this.state.pan.y.interpolate({
          inputRange: [-200, 0, 200],
          outputRange: [0, 1, 0],
        }),
      },
    ];
  };

  render() {
    const { clampedScroll } = this.state;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, SEARCHBAR_HEIGHT],
      outputRange: [0, -SEARCHBAR_HEIGHT],
      extrapolate: 'clamp',
    });
    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, SEARCHBAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const messageCenterTranslate = clampedScroll.interpolate({
      inputRange: [0, SEARCHBAR_HEIGHT],
      outputRange: [0, MESSAGECENTER_HEIGHT],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.mainContainer}>
        <Animated.View style={[this.getStyle()]}>
          <AnimatedListView
            dataSource={this.state.dataSource}
            renderRow={data => <Row {...data} />}
            renderHeader={() => <View style={styles.navbarMargin} />}
            renderFooter={() => <View style={{ paddingTop: 10 }} />}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: { contentOffset: { y: this.state.scrollAnim } },
                },
              ],
              { useNativeDriver: true }
            )}
          />
          <Animated.View
            onLayout={this.setDropZoneValues.bind(this)}
            style={[
              styles.navbar,
              { transform: [{ translateY: navbarTranslate }] },
            ]}>
            <Animated.View
              style={[styles.chatbotContainer, { opacity: navbarOpacity }]}>
              <TextInput
                style={styles.chatbotSearch}
                placeholder={'Hi, How may I help you today?'}
                returnKeyType="next"
                onChangeText={this.handleChatbot}
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                ref={input => (this.chatbotInput = input)}
                value={this.state.chatbot}
              />
              <Image style={styles.image} source={images.dira} />
            </Animated.View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{I18n.t('action_center')}</Text>
            </View>
          </Animated.View>
        </Animated.View>
        <View style={styles.messageCenter}>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[this.state.pan.getLayout()]}>
            <Animated.View
              style={[
                { transform: [{ translateY: messageCenterTranslate }] },
                styles.messageList,
              ]}>
              <View style={styles.messageContainer}>
                <Text style={styles.messageTitleContainer}>
                  <Text style={styles.messageTitle}>{'Welcome to alt.hr'}</Text>
                </Text>
                <Text style={styles.messageDescription}>
                  {
                    'Congratulations! You have completed your onboarding journey. You can now access all modules of alt.hr such as Expenses and Travels.'
                  }
                </Text>
                <Text style={styles.date}>{'27 Mar 2018'}</Text>
                <Text style={styles.viewMore}>{'VIEW MORE'}</Text>
              </View>
              <View style={styles.messageContainer}>
                <Text style={styles.messageTitleContainer}>
                  <Text style={styles.messageTitle}>{'Welcome to alt.hr'}</Text>
                </Text>
                <Text style={styles.messageDescription}>
                  {
                    'Congratulations! You have completed your onboarding journey. You can now access all modules of alt.hr such as Expenses and Travels.'
                  }
                </Text>
                <Text style={styles.date}>{'27 Mar 2018'}</Text>
                <Text style={styles.viewMore}>{'VIEW MORE'}</Text>
              </View>
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

DashboardPage.propTypes = {
  messageCenter: PropTypes.func,
  chatbot: PropTypes.string,
  nav_helper: PropTypes.object,
};
