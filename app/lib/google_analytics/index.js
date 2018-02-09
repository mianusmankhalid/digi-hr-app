import {
  GoogleAnalyticsTracker,
  GoogleAnalyticsSettings,
} from 'react-native-google-analytics-bridge';

import _ from 'lodash';

const tracker = new GoogleAnalyticsTracker(__GA_TRACKER__);
Object.freeze(tracker);

const analytics = {
  trackScreenView: function(screenName) {
    tracker.trackScreenView(screenName);
  },
  init: function() {
    GoogleAnalyticsSettings.setDispatchInterval(30);
    GoogleAnalyticsSettings.setDryRun(true);
  },
  trackEvent: function(category, action, label = null, value = null) {
    var optionalParams = {};
    if (!_.isEmpty(label)) {
      optionalParams = {
        ...optionalParams,
        label: label,
      };
    }

    if (!_.isEmpty(value)) {
      optionalParams = {
        ...optionalParams,
        value: value,
      };
    }

    tracker.trackEvent(category, action, optionalParams);
  },
  trackException: function(msg, isFatal = false) {
    tracker.trackException(msg, isFatal);
  },
};

export default Object.freeze(analytics);
