import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount, render } from 'enzyme';
import { Button } from 'react-bootstrap';

import { UnauthenticatedRoute, mapStateToProps, querystring } from './index';

describe('Home screen', () => {
  const userHasAuthenticated = () => ({});
  const jdomAlert = window.alert;

  beforeAll(() => {
    window.alert = jest.fn();
  });

  afterAll(() => {
    window.alert = jdomAlert;
  })
  
  test('renders with authentication', () => {
    const wrapper = shallow(<UnauthenticatedRoute id='id1' isAuthenticated={true} component={Button as any} props={{id: 'childId1'}}/>);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders without authentication', () => {
    const wrapper = shallow(<UnauthenticatedRoute id='id1' isAuthenticated={false} component={Button as any} props={{id: 'childId1'}}/>);
    expect(wrapper).toMatchSnapshot();
  });

  test('map state to props', () => {
    let props = mapStateToProps({
      authenticate: {
        isAuthenticated: true 
      }
    });
    expect(props.isAuthenticated).toBe(true);
  });

  test('query string', () => {
    let actual = querystring("redirect", "http://facebook.com?redirect=codelink.io");
    expect(actual).toEqual("codelink.io");
  });

})