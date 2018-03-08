import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import images from '@digihr_assets/images';
import styles from './styles';

export default class SignupScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={images.altLogo} />
        </View>
        <View>
          <Text style={styles.title}>Sign up</Text>
        </View>
      </View>
    );
  }
}
