export function isUserLoggedIn() {
  return false;
}

export function isAuthenticated(email, password) {
  if (email === 'usman.khalid@digi.com.my' && password === '123') return true;

  return false;
}
