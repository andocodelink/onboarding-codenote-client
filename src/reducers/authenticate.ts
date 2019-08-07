import { ActionTypes } from '../actions'

const initialState = {
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        isAuthenticated: action.isAuthenticated
      };
    case ActionTypes.LOGOUT:
      return {
        isAuthenticated: false
      };
    default:
      return state;
  }
};