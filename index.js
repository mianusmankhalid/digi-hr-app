import {AppRegistry} from "react-native";
import App from "./app/index";
import {InitTranslations} from "@digihr_lib/translations";

// Initialize translations to be used later
// Usage:
// import I18n from "react-native-i18n";
// I18n.t("keyword");
InitTranslations();
AppRegistry.registerComponent("DigiHrApp", () => App);
