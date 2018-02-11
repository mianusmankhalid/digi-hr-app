export function isDebuggingEnabled() {
  return typeof atob !== 'undefined';
}
