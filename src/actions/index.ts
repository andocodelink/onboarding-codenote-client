export const ActionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
}

export const login = isAuthenticated => ({
  type: ActionTypes.LOGIN,
  isAuthenticated
});

export const logout = () => ({
  type: ActionTypes.LOGOUT
});