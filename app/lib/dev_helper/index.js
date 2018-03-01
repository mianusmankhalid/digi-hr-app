export function isDebuggingEnabled() {
  return __DEV_ENV__ && typeof atob !== 'undefined';
}
