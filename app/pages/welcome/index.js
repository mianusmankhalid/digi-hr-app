import React, { Component } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import styles from "./styles";
import theme from "@digihr_app_config/theme";
import I18n from "react-native-i18n";
import {
  welcomePageDetails,
  moveToDashboard,
  getCompanyLogo,
  getCompanyBackground
} from "./viewController";

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      welcomeText: "",
      logoUrlData: "",
      backgroundImageUrlData: ""
    };
  }

  componentDidMount() {
    getCompanyLogo()
      .then(companyLogo => this.setState({ logoUrlData: companyLogo }))
      .then(() => {
        return getCompanyBackground().then(companyBackground =>
          this.setState({ backgroundImageUrlData: companyBackground })
        );
      })
      .then(() => {
        this.setState({
          welcomeText: this.props.navigation.state.params.welcomeText,
          isLoading: false
        });
      });
  }

  navigateToDashboard = () => {
    this.setState(
      {
        welcomeText: "",
        logoUrlData: "",
        backgroundImageUrlData: ""
      },
      () => {
        moveToDashboard(this.props.nav_helper);
      }
    );
  };

  render() {
    return this.state.isLoading ? (
      <View style={styles.container}>
        <View>
          <ActivityIndicator size="large" color={theme.colors.darkGray} />
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {this.state.backgroundImageUrlData.length !== 0 ? (
            <Image
              style={styles.image}
              source={{ uri: this.state.backgroundImageUrlData }}
            />
          ) : null}
        </View>
        <View style={styles.logoContainer}>
          {this.state.logoUrlData.length !== 0 ? (
            <Image
              style={styles.logo}
              source={{ uri: this.state.logoUrlData }}
            />
          ) : null}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{this.state.welcomeText}</Text>
        </View>
        <View style={styles.continueContainer}>
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.navigateToDashboard}
            >
              <Text style={styles.buttonText}>{I18n.t("continue")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
