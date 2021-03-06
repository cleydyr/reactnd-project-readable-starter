import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import PostList from '../components/PostList';
import {Link} from 'react-router-dom';

const defaultPosts = [
	{
		id: '8xf0y6ziyjabvozdd253nd',
		timestamp: 1467166872634,
		title: 'Udacity is the best place to learn React',
		body: 'Everyone says so after all.',
		author: 'thingtwo',
		category: 'react',
		voteScore: 6,
		deleted: false,
		commentCount: 2
	},
	{
		id: '6ni6ok3ym7mf1p33lnez',
		timestamp: 1468479767190,
		title: 'Learn Redux in 10 minutes!',
		body: 'Just kidding. It takes more than 10 minutes to learn technology.',
		author: 'thingone',
		category: 'redux',
		voteScore: -5,
		deleted: false,
		commentCount: 0
	},
];

describe('PostList tests', () => {
	it('should is a ul element', () => {
		const wrapper = shallow(
			<PostList posts={[]} />
		);

		return expect(wrapper.is('ul')).toBe(true);
	});

	it(`should have as many one li's elements as the size of the posts props
		passed to it`, () => {

		const wrapper = shallow(
			<PostList posts={defaultPosts} />
		);

		return expect(wrapper.children().find('li').length)
			.toBe(defaultPosts.length);
	});

	it(`should have as many Link elements as the size of the posts props
		passed to it`, () => {

		const wrapper = shallow(
			<PostList posts={defaultPosts} />
		);

		return expect(
				wrapper
					.children()
					.map(el => el.children())
					.filter(el => el.name() === 'Link')
					.length
			)
			.toBe(defaultPosts.length);
	});
});
