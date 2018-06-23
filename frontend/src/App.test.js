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
	getPostsForCategory,
} from './service/post-service';

import {
	getCommentsForPost,
	getComment,
	upVoteComment,
	downVoteComment,
	deleteComment,
	editComment,
	addComment,
} from './service/comment-service';

import { getCategories } from './service/categories-service';

const logIt = result => console.log(result) || result;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('test services', function () {
	let server;
	beforeAll(function () {
	  server = require('../../api-server/server');
	});

	afterAll(function () {
	  server.close();
	});

	const existingPostId = '8xf0y6ziyjabvozdd253nd';
	const deletedPostId = '6ni6ok3ym7mf1p33lnez'
  describe('test posts', function () {
	it('should have 1 post under the category redux', () =>
		getPostsForCategory('redux').then(posts => expect(posts.length).toBe(1))
  	);
	it('should have 2 posts on the server', () =>
      getPosts().then(posts => expect(posts.length).toBe(2))
	);
	it('should have a defined post with author thingone', () =>
      getPost(deletedPostId).then(post => expect(post.author).toBe('thingone'))
	);
	it('should increase a given vote score by +1', () =>
      upVotePost(deletedPostId).then(post => expect(post.voteScore).toBe(-4))
	);
	it('should decrease a given vote score by +1', () =>
      downVotePost(existingPostId).then(post => expect(post.voteScore).toBe(5))
	);
	it('should delete a post, leaving only 1 post on the server', () =>
      deletePost(deletedPostId).then(() => getPosts().then(posts => expect(posts.length).toBe(1)))
	);
	it('should edit a post', () => {
	  let newBody = 'lorem ipsum';
	  return editPost({id: existingPostId, body: newBody, title: 'newTitle'}).then(post => expect(post.body).toBe(newBody));
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

  describe('test comments', function () {
	it('should have 2 comments for a given post', () =>
	  getCommentsForPost(existingPostId).then(comments => expect(comments.length).toBe(2))
    );
	it('should have a defined comment with author thingtwo', () =>
      getComment('894tuq4ut84ut8v4t8wun89g').then(comment => expect(comment.author).toBe('thingtwo'))
	);
	it('should increase a given vote score by +1', () =>
      upVoteComment('8tu4bsun805n8un48ve89').then(comment => expect(comment.voteScore).toBe(-4))
	);
	it('should decrease a given vote score by +1', () =>
      downVoteComment('894tuq4ut84ut8v4t8wun89g').then(comment => expect(comment.voteScore).toBe(5))
	);
	it('should delete a comment, leaving only 1 comment on the server', () =>
      deleteComment('8tu4bsun805n8un48ve89').then(() => getCommentsForPost(existingPostId).then(comments => expect(comments.length).toBe(1)))
	);
	it('should edit a comment', () => {
	  let newBody = 'lorem ipsum';
	  return editComment({id: '894tuq4ut84ut8v4t8wun89g', body: newBody, timestamp: Date.now()})
	  	.then(comment => expect(comment.body).toBe(newBody));
	});
	it('should add a new comments, leaving 2 comments on the server', () => {
		let newComment = {
			id: '54E64A9C-20D0-49A7-AAAA-1AB732D9AB79',
			timestamp: Date.now(),
			body: 'Help people reach their potential to serve others',
			author: 'Cleydyr',
			parentId: existingPostId,
		};
		return addComment(newComment).then(() => getCommentsForPost(existingPostId).then(comments => expect(comments.length).toBe(2)));
	  });
  });

  describe('test categories', function () {
	it('should have 3 categories', () =>
	  getCategories().then(categories => expect(categories.categories.length).toBe(3))
    );
  });
});