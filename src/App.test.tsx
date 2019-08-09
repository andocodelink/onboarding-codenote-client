import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import { History } from 'history';

import { App, mapDispatchToProps } from './App';
import { getCurrentSession, logout } from './api';

const _getCurrentSession = getCurrentSession;
const _logout = logout;

jest.mock("./api", () => ({
  getCurrentSession: jest.fn(),
  logout: jest.fn()
}));

describe('App', () => {
  const jdomAlert = window.alert;

  beforeAll(() => {
    window.alert = jest.fn();
    (getCurrentSession as any).mockImplementation(() => {
      throw _getCurrentSession();
    });
    (logout as any).mockImplementation(() => {
      throw _logout();
    });
  });

  afterAll(() => {
    window.alert = jdomAlert;
  })

  test('renders with an existing session', async () => {
    let history: any = jest.fn();
    const wrapper = mount(<MemoryRouter><App renderChildren={false} history={history} userHasAuthenticated={(() => ({}))} /></MemoryRouter>);
    await Promise.resolve();
    expect(wrapper.exists()).toBe(true);
  });

  test('renders without a session', async () => {
    (getCurrentSession as any).mockImplementation(() => {
      throw new Error('error');
    });
    let history: any = jest.fn();
    const wrapper = mount(<MemoryRouter><App renderChildren={false} history={history} userHasAuthenticated={(() => ({}))} /></MemoryRouter>);
    await Promise.resolve();
    expect(wrapper.exists()).toBe(true);
  });

  test('logout handler', async () => {
    let history: any = jest.fn();
    history.push = (..._) => ({})
    let expectedIsAuthen = true;
    let app = new App({
      renderChildren: false,
      history: history,
      userHasAuthenticated: ((isAuthen) => {
        expectedIsAuthen = isAuthen;
        return { expectedIsAuthen };
      })
    });
    (logout as any).mockImplementation(() => {
      return Promise.resolve({});
    });
    await app.handleLogout();
    expect(expectedIsAuthen).toBe(false);
  });

  test('map dispatch to props', () => {
    let dispatch = jest.fn();
    let props =  mapDispatchToProps(dispatch);
    expect(props.userHasAuthenticated).toBeInstanceOf(Function);
  });

})
