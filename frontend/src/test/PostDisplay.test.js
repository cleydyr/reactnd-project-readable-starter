import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import PostDisplay from '../components/PostDisplay';

const post = {
	id: '8xf0y6ziyjabvozdd253nd',
	timestamp: 1467166872634,
	title: 'Udacity is the best place to learn React',
	body: 'Everyone says so after all.',
	author: 'thingtwo',
	category: 'react',
	voteScore: 6,
	deleted: false,
	commentCount: 2
};

describe('PostDisplay tests', () => {
	it('should be a div element', () => {
		const wrapper = shallow(
			<PostDisplay post={post} />
		);

		return expect(wrapper.is('div')).toBe(true);
	});
});
