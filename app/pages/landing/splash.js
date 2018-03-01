import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import theme from "@digihr_app_config/theme";
import images from "@digihr_assets/images";

export default class Splash extends Component {
  
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
  
  const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.background.colors.white,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        fontFamily: 'Muli-Regular',
        color: theme.colors.grey,
        fontWeight: 'bold',
        paddingBottom: 20,
    },
    titleWrapper: {
        justifyContent: 'center',
        flex: 1
    },
    image: {
        width: 200,
        height: 200
    }
  });