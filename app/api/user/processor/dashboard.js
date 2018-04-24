import HttpError from '@digihr_errors/HttpError';
import InternetConnectionError from '@digihr_errors/InternetConnectionError';

/**
 * Processes error to be more human friendly before returning control
 * @param {Error} result
 */
export function processError(result) {
  if (result instanceof HttpError) {
    if (result.http_code === 504) {
      result.message =
        `We cannot connect you to the server, but we are trying our level best to do so.` +
        `\nIf you are having this problem repeatedly, please contact us at someadmin@admin2.com`;
    }
  } else if (result instanceof InternetConnectionError) {
    result.message = `Internet connection error, please check if you are still connected to the internet`;
  }

  return result;
}
