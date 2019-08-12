import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from 'enzyme';

import { Navigation } from './index';
import { logout } from '../../api'

jest.mock("../../api", () => ({
  logout: jest.fn(() => Promise.resolve({}))
}));

describe('Home screen', () => {
  const userHasAuthenticated = () => ({});
  const jdomAlert = window.alert;

  beforeAll(() => {
    window.alert = jest.fn();
  });

  afterAll(() => {
    window.alert = jdomAlert;
  })
  
  test('renders', () => {
    let history: any = jest.fn();
    const wrapper = render(<MemoryRouter><Navigation isAuthenticated history={history} userHasAuthenticated={(() => ({}))} /></MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });

  test('logout handler', async () => {
    let push = jest.fn((uri) => {});
    let history: any = {
      push
    }
    let userHasAuthenticated = jest.fn((b) => {});
    let app = new Navigation({
      isAuthenticated: true,
      history,
      userHasAuthenticated
    });
    (logout as any).mockImplementation(() => {
      return Promise.resolve({});
    });
    await app.handleLogout();
    expect(userHasAuthenticated.mock.calls[userHasAuthenticated.mock.calls.length - 1]).toEqual([false]);
    expect(push.mock.calls[push.mock.calls.length - 1]).toEqual(['/login']);
  });

})