import React from 'react';
//only really need the shallow render
//Full DOM used to for tutorial purpose
import { mount, unmount } from 'enzyme';

import CommentBox from 'components/CommentBox';
import Root from 'reducers/Root';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <CommentBox />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('has a text area and two buttons', () => {
  expect(wrapped.find('textarea').length).toEqual(1);
  expect(wrapped.find('button').length).toEqual(2);

  //console.log(wrapped.find('textarea').length);
});

describe('the text area', () => {
  beforeEach(() => {
    wrapped
      .find('textarea')
      .simulate('change', {
        target: { value: 'new comment' }
      })
      .update();
  });

  it('has a text that users can write in', () => {
    //write and submit a fake comment: 'new comment'
    expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
  });

  it('when form is submitted, the textarea gets emptied', () => {
    wrapped.find('form').simulate('submit').update();

    expect(wrapped.find('textarea').prop('value')).toEqual('');
  });
});
