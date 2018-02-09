import { createNavigationParams } from './helper';
import data from './mock_data';
import _ from 'lodash';

const dataMapping = _.map(data, item => {
  return createNavigationParams(item.forScreen, item.data);
});

export default {
  GetParamsForScreen: screenName => {
    var mapping = dataMapping.filter(mapping =>
      _.isEqual(mapping.screenName, screenName)
    );

    if (mapping.length > 0) {
      return mapping[0].screenParams;
    } else {
      return {};
    }
  },
};
