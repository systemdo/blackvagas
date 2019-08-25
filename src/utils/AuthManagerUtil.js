const AuthManagerUtil = {
  name: 'auth',
  setAuthSession: auth => {
    localStorage.setItem(AuthManagerUtil.name, JSON.stringify(auth));
  },
  getAuthSession: () => {
    const auth = localStorage.getItem(AuthManagerUtil.name);
    if (auth !== null) return JSON.parse(auth);
    return null;
  },
  getAuthToken: () => {
    const auth = AuthManagerUtil.getAuthSession();
    if (auth !== null) return auth.token;
    return null;
  },
  removeAuth: () => {
    localStorage.removeItem(AuthManagerUtil.name);
  },
  isAuthenticated: () => {
    const auth = AuthManagerUtil.getAuthSession();
    if (auth !== null) return true;
    return false;
  }
};

export default AuthManagerUtil;
