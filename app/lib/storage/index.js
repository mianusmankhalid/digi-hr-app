import { AsyncStorage } from 'react-native';
import _ from 'lodash';

export function storeInformation(key, value) {
  return AsyncStorage.setItem(key, JSON.stringify(value)).catch(() => {
    throw new Error(`Error storing data for key \`${key}\``);
  });
}

export function getInformation(key) {
  return AsyncStorage.getItem(key).then(value => {
    if (_.isEmpty(value))
      throw new Error(`Error fetching data for key \`${key}\``);

    return JSON.parse(value);
  });
}

export function purgeInformation(key) {
  return AsyncStorage.getItem(key)
    .then(() => {
      return AsyncStorage.removeItem(key).catch(() => {
        throw new Error(`Error removing data for key \`${key}\``);
      });
    })
    .catch(() => {
      // Probably there wasn't the item yet with the key,
      // hence nothing to remove just be humble :)
    });
}
