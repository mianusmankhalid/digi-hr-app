import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from "@digihr_app_config/theme";

export default class Splash extends Component {
  
    render() {
      return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Digi Splash Screen</Text>
            </View>
            <View>
                <Text style={styles.subtitle}>Powered by Digi</Text>
            </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.background.colors.green,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: theme.colors.milkWhite,
        fontSize: 25,
        fontWeight: 'bold'
    },
    subtitle: {
        color: theme.colors.milkWhite,
        fontWeight: '200',
        paddingBottom: 20
    },
    titleWrapper: {
        justifyContent: 'center',
        flex: 1
    }
  });