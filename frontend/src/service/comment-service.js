import getOptions, {methods} from './service-utils';
import rp from 'request-promise';

export const getCommentsForPost = (postId) =>
	rp(getOptions(`/posts/${postId}/comments`));

export const addComment = ({id, timestamp, body, author, parentId,}) => {
	const options = getOptions('/comments', methods.POST);
	return rp({
		...options,
		body: {id, timestamp, body, author, parentId,},
	});
}

export const getComment = (id) =>
	rp(getOptions(`/comments/${id}`));

export const upVoteComment = (id) => {
	const options = getOptions(`/comments/${id}`, methods.POST);
	return rp({
		...options,
		body: {
			option: 'upVote',
		},
	});
};

export const downVoteComment = (id) => {
	const options = getOptions(`/comments/${id}`, methods.POST);
	return rp({
		...options,
		body: {
			option: 'downVote',
		},
	});
};

export const editComment = ({id, timestamp, body,}) => {
	const options = getOptions(`/comments/${id}`, methods.PUT);
	return rp({
		...options,
		body: {id, timestamp, body,},
	});
};

export const deleteComment = (id) =>
	rp(getOptions(`/comments/${id}`, methods.DELETE));
