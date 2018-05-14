import React, { Component } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import images from '@digihr_assets/images';
import { letUserIn } from './viewController';
import styles from './styles';
import timer from 'react-native-timer';
import theme from '@digihr_app_config/theme';

export default class SplashScreen extends Component {
  timerOver() {
    letUserIn(this.props.nav_helper);
  }

  componentDidMount() {
    timer.setTimeout('letUserIn', this.timerOver.bind(this), 2000);
  }

  render() {
    TextInput.defaultProps.selectionColor = theme.colors.gold;
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={images.altLogo} />
        </View>
        <View>
          <Text style={styles.title}>alt.hr</Text>
        </View>
      </View>
    );
  }
}
