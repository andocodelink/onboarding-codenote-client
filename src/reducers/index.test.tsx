import authenticate from './authenticate';
import { actionTypes } from '../actions/authenticate';

describe('authenticate action', () => {
  test('authenticate', () => {
    let actual = authenticate({
      isAuthenticated: false
    }, {
        type: actionTypes.LOGIN_SUCCESS,
        payload: true
      })
    expect(actual.isAuthenticated).toBe(true);
  });

  test('default action', () => {
    let actual = authenticate({
      isAuthenticated: false
    }, {
        type: 'UNKNOWN',
        payload: true
      })
    expect(actual.isAuthenticated).toBe(false);
  });

})