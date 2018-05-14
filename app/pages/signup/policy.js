import React, { Component } from "react";
import { WebView, View, Dimensions } from "react-native";
import NavigationHelper from "@digihr_lib/navigation/helper";
import I18n from "react-native-i18n";
import { getTermsAndConditionHtml } from "./viewController";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const policyHtml = `
  <html>
  <body>
    <h1>Policy</h1>
    <p>Real policy would be displayed here</p>
  </body>
  </html>
`;

export default class Policy extends Component {
  constructor(props) {
    super(props);
    this.props.nav_helper.setScreenParams({
      headerBackTitle: I18n.t("policies").toUpperCase()
    });
  }

  componentWillMount() {
    //getTermsAndConditionHtml().then(data => console.log(data));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ html: policyHtml }}
          javaScriptEnabled={true}
          startInLoadingState={true}
          onLoadEnd={() => {}}
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
