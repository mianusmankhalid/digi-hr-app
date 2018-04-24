import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Animated } from 'react-native';
import theme from '@digihr_app_config/theme';

const { width, height } = Dimensions.get('window');

export default class ScrollPages extends Component {
  constructor(props) {
    super(props);
  }

  scrollX = new Animated.Value(0);

  componentDidMount() {
    setTimeout(() => {
      this.myScroll !== null
        ? this.myScroll.scrollTo({
            x: width * (this.props.selectedDotIndex || 0),
            animated: false,
          })
        : null;
    }, 0);
  }

  render() {
    let position = Animated.divide(this.scrollX, width);
    let translateX = position.interpolate({
      inputRange: [
        (this.props.visibleDots || 5) - 3,
        (this.props.visibleDots || 5) - 2,
        (this.props.visibleDots || 5) - 1,
      ],
      outputRange: [0, 0, -16],
    });
    var dots = [];
    for (i = 0; i < this.props.totalDots; i++) {
      let opacity = position.interpolate({
        inputRange: [
          i - 2,
          i - 1,
          i,
          i + 1,
          i + 2,
          i + 3,
          i + (this.props.visibleDots || 5) - 1,
        ],
        outputRange: [
          i < (this.props.visibleDots || 5) ? 0.3 : 0,
          0.3,
          1,
          0.3,
          0.3,
          0.3,
          0,
        ],
        extrapolate: 'clamp',
      });
      dots.push(
        <Animated.View
          key={i}
          style={{
            opacity,
            height: 8,
            width: 8,
            backgroundColor: theme.colors.white,
            margin: 4,
            borderRadius: 5,
          }}
        />
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: theme.background.colors.black,
            width: width,
            height: 25,
            position: 'absolute',
            top: 0,
            left: 0,
            paddingLeft:
              width -
              (width / 2 +
                ((this.props.visibleDots > this.props.totalDots
                  ? this.props.totalDots
                  : this.props.visibleDots) || 5) *
                  8),
          }}>
          <Animated.View
            style={{
              flexDirection: 'row',
              transform: [
                {
                  translateX,
                },
              ],
            }}>
            {dots}
          </Animated.View>
        </View>
        <View style={{ width, height, paddingTop: 65, paddingBottom: 40 }}>
          <ScrollView
            ref={ref => (this.myScroll = ref)}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { x: this.scrollX } } },
            ])}
            scrollEventThrottle={16}>
            {this.props.dataMap}
          </ScrollView>
        </View>
      </View>
    );
  }
}
