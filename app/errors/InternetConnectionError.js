const ERR_NAME = 'InternetConnection';

export default function InternetConnectionError(
  message = 'Please check your internet connection'
) {
  let tmp = Error.apply(this, arguments);
  tmp.name = this.name = ERR_NAME;

  this.message = tmp.message = message;

  Object.defineProperty(this, 'stack', {
    get: function() {
      return tmp.stack;
    },
  });

  return this;
}
