const UserManagerUtil = {
  name: 'user',
  setUserSession: user => {
    localStorage.setItem(UserManagerUtil.name, JSON.stringify(user));
  },
  getUserSession: () => {
    const user = localStorage.getItem(UserManagerUtil.name);
    if (user !== null) return JSON.parse(user);
    return null;
  },
  removeUser: () => {
    localStorage.removeItem(UserManagerUtil.name);
  },
};

export default UserManagerUtil;
