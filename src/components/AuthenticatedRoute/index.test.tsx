import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount, render } from 'enzyme';
import { Button } from 'react-bootstrap';

import { AuthenticatedRoute, mapStateToProps } from './index';

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
    const wrapper = render(<MemoryRouter><AuthenticatedRoute id='id1' component={Button as any} props={{id: 'childId1'}}/></MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });

})