import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import { History } from 'history';

import { App, mapDispatchToProps } from './App';
import { getCurrentSession, logout } from './api';

jest.mock("./api", () => ({
  getCurrentSession: jest.fn(() => Promise.resolve({})),
  logout: jest.fn(() => Promise.resolve({}))
}));

describe('App', () => {
  const jdomAlert = window.alert;

  beforeAll(() => {
    window.alert = jest.fn();
  });

  afterAll(() => {
    window.alert = jdomAlert;
  })

  test('renders with an existing session', async () => {
    let history: any = jest.fn();
    let userHasAuthenticated = jest.fn((b) => {});
    const wrapper = mount(<MemoryRouter><App renderChildren={false} history={history} userHasAuthenticated={userHasAuthenticated} /></MemoryRouter>);
    await Promise.resolve();
    expect(wrapper.exists()).toBe(true);
    expect(userHasAuthenticated.mock.calls[userHasAuthenticated.mock.calls.length - 1]).toEqual([true]);
  });

  test('renders without a session', async () => {
    (getCurrentSession as any).mockImplementation(() => {
      throw new Error('error');
    });
    let history: any = jest.fn();
    let userHasAuthenticated = jest.fn((b) => {});
    const wrapper = mount(<MemoryRouter><App renderChildren={false} history={history} userHasAuthenticated={userHasAuthenticated} /></MemoryRouter>);
    await Promise.resolve();
    expect(wrapper.exists()).toBe(true);
    expect(userHasAuthenticated.mock.calls.length).toEqual(0);
  });

  test('logout handler', async () => {
    let push = jest.fn((uri) => {});
    let history = {
      push
    }
    let userHasAuthenticated = jest.fn((b) => {});
    let app = new App({
      renderChildren: false,
      history: history,
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
