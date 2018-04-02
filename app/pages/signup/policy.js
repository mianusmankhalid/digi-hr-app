import React, { Component } from "react";
import { WebView, View, Dimensions } from "react-native";
import NavigationHelper from "@digihr_lib/navigation/helper";
import I18n from "react-native-i18n";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class Policy extends Component {
  constructor(props) {
    super(props);
    this.props.nav_helper.setScreenParams({
      headerBackTitle: I18n.t("policies").toUpperCase()
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: "https://althr.co/policy" }}
          javaScriptEnabled={true}
          startInLoadingState={true}
          onLoadEnd={() => {
          }}
          injectedJavaScript={'alert("Its me")'}
          onNavigationStateChange={navEvent => console.log(navEvent)}
          style={{
            flex: 1,
            height: deviceHeight,
            width: deviceWidth
          }}
          scalesPageToFit={true}
        />
      </View>
    );
  }
}

Policy.navigationOptions = ({ navigation }) => {
  const { state } = navigation;

  // get the "deepest" current params.
  const currentParams = NavigationHelper.getCurrentScreenParams(state);

  return {
    headerBackTitle: currentParams.headerBackTitle,
    headerTitle: currentParams.headerBackTitle
  };
};
