import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
	getPosts,
	getPost,
} from './service/post-service';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('test services', function () {
  var server;
  beforeEach(function () {
    server = require('../../api-server/server');
  });

  afterAll(function () {
    server.close();
  });

  describe('test posts', function () {
	it('should have 2 posts on the server', () =>
      getPosts().then(posts => expect(posts.length).toBe(2))
	);
	it('should have a defined post with author thingone', () =>
      getPost('6ni6ok3ym7mf1p33lnez').then(post => expect(post.author).toBe('thingone'))
	);
  });
});