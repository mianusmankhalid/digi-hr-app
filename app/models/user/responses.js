export function success() {
  return 'passwrod reset email has been sent to you';
}

export function notApplied() {
  return 'email is not registered under our system to change password';
}

export function serverTimeout() {
  return 'Some problem with our server';
}

export function connectionTimeout() {
  return 'Your internet has some problem, cannot connect to server at this time';
}
