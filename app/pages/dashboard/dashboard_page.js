import React, { Component } from 'react';
import {
  ListView,
  View,
  Text,
  Animated,
  TextInput,
  Image,
  PanResponder,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import Row from './row';
import styles from './styles';
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
      dataSource: ds.cloneWithRows([]),
      messageCenterData: [],
      dashboardData: {},
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

  componentDidMount() {
    this.props.getActionCenterData().then(data => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
      });
    });

    this.props.getMessageCenterData().then(data => {
      this.setState({
        messageCenterData: data,
      });
    });

    this.props.getDashboardData().then(data => {
      this.setState({
        dashboardData: data,
      });
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

  renderActionCenter(isData) {
    if (isData) {
      return (
        <AnimatedListView
          dataSource={this.state.dataSource}
          renderRow={data => (
            <Row
              {...data}
              chatbotImage={this.state.dashboardData.chatbotImage}
            />
          )}
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
      );
    } else {
      return (
        <Text style={styles.emptyContainer}>
          {I18n.t('nothing_new_to_show')}
        </Text>
      );
    }
  }

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
        <Animated.View style={[this.getStyle(), styles.actionCenterContainer]}>
          {this.renderActionCenter(this.state.dataSource.getRowCount())}
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
                placeholder={I18n.t('help_message')}
                returnKeyType="next"
                onChangeText={this.handleChatbot}
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                ref={input => (this.chatbotInput = input)}
                value={this.state.chatbot}
              />
              <Image
                style={styles.image}
                source={{ uri: this.state.dashboardData.chatbotImage }}
              />
            </Animated.View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{I18n.t('action_center')}</Text>
            </View>
          </Animated.View>
        </Animated.View>
        <View
          style={[
            styles.messageCenter,
            this.state.dataSource.getRowCount() === 0 &&
            this.state.messageCenterData.length > 1
              ? { top: 260 }
              : { top: 420 },
          ]}>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[this.state.pan.getLayout()]}>
            <Animated.View
              style={[
                { transform: [{ translateY: messageCenterTranslate }] },
                styles.messageList,
              ]}>
              {this.state.messageCenterData.map((message, key) => {
                return (
                  <View key={key} style={styles.messageContainer}>
                    <Text style={styles.messageTitleContainer}>
                      <Text style={styles.messageTitle}>{message.title}</Text>
                    </Text>
                    <Text style={styles.messageDescription}>
                      {message.description}
                    </Text>
                    <Text style={styles.date}>{message.date}</Text>
                    <TouchableHighlight style={styles.viewMoreTouchable}>
                      <Text style={styles.viewMore}>{I18n.t('view_more')}</Text>
                    </TouchableHighlight>
                  </View>
                );
              })}
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

DashboardPage.propTypes = {
  messageCenter: PropTypes.func,
  getActionCenterData: PropTypes.func,
  getMessageCenterData: PropTypes.func,
  getDashboardData: PropTypes.func,
  chatbot: PropTypes.string,
  nav_helper: PropTypes.object,
};
