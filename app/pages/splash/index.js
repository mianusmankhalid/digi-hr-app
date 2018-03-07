import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import images from '@digihr_assets/images';
import { letUserIn } from './viewController';
import styles from './styles';
import timer from 'react-native-timer';

export default class SplashScreen extends Component {
  timerOver() {
    letUserIn(this.props.nav_helper);
  }

  componentDidMount() {
    timer.setTimeout('letUserIn', this.timerOver.bind(this), 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Image style={styles.image} source={images.altLogo} />
        </View>
        <View>
          <Text style={styles.footer}>alt.hr</Text>
        </View>
      </View>
    );
  }
}
