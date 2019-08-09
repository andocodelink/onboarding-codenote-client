import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount, render } from 'enzyme';
import { Button } from 'react-bootstrap';

import { Navigation, mapStateToProps, mapDispatchToProps } from './index';

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
    const wrapper = render(<MemoryRouter><Navigation isAuthenticated={true} history={history} userHasAuthenticated={(() => ({}))} /></MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });

  test('logout handler', async () => {
    let history: any = jest.fn();
    history.push = (..._) => ({})
    let expectedIsAuthen = true;
    let app = new Navigation({
      isAuthenticated: true,
      history: history,
      userHasAuthenticated: ((isAuthen) => {
        expectedIsAuthen = isAuthen;
        return { expectedIsAuthen };
      })
    });
    await app.handleLogout();
    expect(expectedIsAuthen).toBe(false);
  });

  test('map state to props', () => {
    let props = mapStateToProps({
      authenticate: {
        isAuthenticated: true 
      }
    });
    expect(props.isAuthenticated).toBe(true);
  });
  test('map dispatch to props', () => {
    let dispatch = jest.fn();
    let props =  mapDispatchToProps(dispatch);
    expect(props.userHasAuthenticated).toBeInstanceOf(Function);
  });

})