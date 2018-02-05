import I18n from "react-native-i18n";
import translations from "@digihr_translations";

export function InitTranslations() {
  I18n.fallbacks = true;
  I18n.translations = translations;
}
