import getOptions from './service-utils';
import rp from 'request-promise';

export const getPosts = () =>
	rp(getOptions('/posts'));

export const addPost = ({id, timestamp, title, body, author, category,}) => {
	const options = getOptions('/posts', methods.POST);
	return rp({
		...options,
		headers: {
			...options.headers,
			'Content-Type': 'application/json',
		},
		body: {id, timestamp, title, body, author, category,},
	});
}

export const getPost = (id) =>
	rp(getOptions(`/posts/${id}`));

export const upVotePost = (id) => {
	const options = getOptions(`/posts/${id}`, methods.POST);
	return rp({
		...options,
		headers: {
			...options.headers,
			'Content-Type': 'application/json',
		},
		body: {
			option: 'upVote',
		},
	});
};

export const downVotePost = (id) => {
	const options = getOptions(`/posts/${id}`, methods.POST);
	return rp({
		...options,
		headers: {
			...options.headers,
			'Content-Type': 'application/json',
		},
		body: {
			option: 'downVote',
		},
	});
};

export const editPost = ({id, title, body,}) => {
	const options = getOptions(`/posts/${id}`, methods.PUT);
	return rp({
		...options,
		headers: {
			...options.headers,
			'Content-Type': 'application/json',
		},
		body: {id, title, body,},
	});
};

export const deletePost = (id) =>
	rp(getOptions(`/posts/${id}`, methods.DELETE));
