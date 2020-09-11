import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';

import Root from 'reducers/Root';
import App from 'components/App';

let wrapped;

beforeEach(() => {
  //Attempt to render the *entire* app
  wrapped = mount(
    <Root>
      <App />
    </Root>
  );

  moxios.install();
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [{ name: 'fetch 1' }, { name: 'fetch 2' }]
  });
});

afterEach(() => {
  moxios.uninstall();
  wrapped.unmount();
});

it('can fetch a list of comments and display them', () => {
  //Find the 'fetchCommments' button and click it
  wrapped.find('.fetchComments').simulate('click');

  //Expect to find a list of comments
  moxios.wait(() => {
    expect(wrapped.find('li').length).toEqual(2);

    done();
  });
});
