import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount, render } from 'enzyme';

import { Home } from './index';

describe('Home screen', () => {
  const userHasAuthenticated = () => ({});
  const jdomAlert = window.alert;

  beforeAll(() => {
    window.alert = jest.fn();
  });

  afterAll(() => {
    window.alert = jdomAlert;
  })
  
  test('renders without authenication', () => {
    const wrapper = shallow(<Home isAuthenticated={false} userHasAuthenticated={userHasAuthenticated} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders with authenication', () => {
    const wrapper = shallow(<Home isAuthenticated={true} userHasAuthenticated={userHasAuthenticated} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('validate states with 10 notes', async () => {
    let windowAlert: any = window.alert;
    windowAlert.mockClear();
    const wrapper = mount(<MemoryRouter><Home isAuthenticated={true} userHasAuthenticated={userHasAuthenticated} /></MemoryRouter>);
    await Promise.resolve();
    expect(wrapper.find('Home').state().notes).toHaveLength(10);
  });

})