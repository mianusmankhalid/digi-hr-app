import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import _ from 'lodash';

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.prepareOptions(),
      selScreen: '',
    };
  }

  prepareOptions() {
    let availableScreens = [
      'Dashboard',
      'Onboarding',
      'Expenses',
      'Travels',
      'Logout',
    ];
    let options = [];
    for (let screen of availableScreens) {
      options.push({
        screenName: screen,
        displayName: screen,
      });
    }
    return options;
  }

  componentDidMount() {
    this.setState({ selScreen: this.state.options[0].screenName });
  }

  navigateToScreen = route => () => {
    this.setState({
      selScreen: route,
    });

    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    const { screenProps } = this.props;
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <View>
            <View style={styles.navTopSectionStyle}>
              <TouchableOpacity
                style={styles.sideMenuImageContainer}
                onPress={this.navigateToScreen('Profile').bind(this)}>
                <Image
                  style={styles.sideMenuImage}
                  source={{ uri: screenProps.dashboardData.userImage }}
                />
              </TouchableOpacity>
              <Text style={styles.sideMenuName}>
                {screenProps.dashboardData.userName}
              </Text>
              <Text style={styles.sideMenuTitle}>
                {screenProps.dashboardData.userTitle}
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.navSectionStyle}>
              {this.state.options.map((option, key) => {
                let st = [styles.navItemStyle];

                st.push(
                  _.isEqual(this.state.selScreen, option.displayName)
                    ? styles.navItemHighlightedStyle
                    : styles.navItemNormalStyle
                );

                return (
                  <Text
                    key={key}
                    style={st}
                    onPress={this.navigateToScreen(option.screenName).bind(
                      this
                    )}>
                    {option.displayName}
                  </Text>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object,
  screenProps: PropTypes.object,
};
