import HttpError from '@digihr_errors/HttpError';
import InternetConnectionError from '@digihr_errors/InternetConnectionError';

/**
 * Processes error to be more human friendly before returning control
 * @param {Error} result
 * @param {string} text
 */
export function processError(result, text) {
  if (result instanceof HttpError) {
    if (result.http_code === 504) {
      result.message =
        `We cannot connect you to the server, but we are trying our level best to do so.` +
        `\nIf you are having this problem repeatedly, please contact us at someadmin@admin2.com`;
    } else if (result.http_code === 401) {
      result.message =
        `We are sorry that we cannot find your email ${text} in our system\n` +
        `Try signing up for this email.`;
    }
  } else if (result instanceof InternetConnectionError) {
    result.message = `Internet connection error, please check if you are still connected to the internet`;
  }

  return result;
}
