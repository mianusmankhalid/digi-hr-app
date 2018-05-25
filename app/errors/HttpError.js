const ERR_NAME = 'HttpError';

export default function HttpError(
  http_status_code,
  message = 'Some error occurred'
) {
  let tmp = Error.apply(this, arguments);
  tmp.name = this.name = ERR_NAME;

  this.message = tmp.message = message;
  this.http_code = http_status_code;

  Object.defineProperty(this, 'stack', {
    get: function() {
      return tmp.stack;
    },
  });

  return this;
}
