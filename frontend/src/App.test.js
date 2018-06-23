import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
	getPosts,
	getPost,
	upVotePost,
	downVotePost,
	deletePost,
	editPost,
	addPost,
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
	it('should increase a given vote score by +1', () =>
      upVotePost('6ni6ok3ym7mf1p33lnez').then(post => expect(post.voteScore).toBe(-4))
	);
	it('should decrease a given vote score by +1', () =>
      downVotePost('8xf0y6ziyjabvozdd253nd').then(post => expect(post.voteScore).toBe(5))
	);
	it('should delete a post, leaving only 1 post on the server', () =>
      deletePost('8xf0y6ziyjabvozdd253nd').then(() => getPosts().then(posts => expect(posts.length).toBe(1)))
	);
	it('should edit a post', () => {
	  let newBody = 'lorem ipsum';
	  return editPost({id: '8xf0y6ziyjabvozdd253nd', body: newBody, title: 'newTitle'}).then(post => expect(post.body).toBe(newBody));
	});
	it('should add a new post, leaving 2 posts on the server', () => {
		let newPost = {
			id: 'D57043D7-B776-4705-B777-9867C08A49EC',
			timestamp: Date.now(),
			title: 'Liferay',
			body: 'Enterprise, open source, for Life',
			author: 'thingthree',
			category: 'udacity',
		};
		return addPost(newPost).then(() => getPosts().then(posts => expect(posts.length).toBe(2)));
	  });
  });
});