import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
	getPosts,
} from './service/post-service';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('../../api-server/server');
  });

  afterEach(function () {
    server.close();
  });

  it('should have 2 posts on the server', () =>
	getPosts().then(posts => expect(posts.length).toBe(2))
  );
});