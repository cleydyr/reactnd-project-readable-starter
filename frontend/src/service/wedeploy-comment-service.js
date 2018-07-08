import WeDeploy from 'wedeploy';

const service = WeDeploy
	.data(process.env.REACT_APP_READABLE_API_URL);

export const getCommentsForPost = (postId) =>
	service
		.where('parentId', '=', postId)
		.get('/comments');

export const addComment = ({id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted}) =>
	service.create('/comments', {id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted,});

export const getComment = (id) =>
	service.get(`/comments/${id}`);

export const upVoteComment = (id) =>
	getComment(id)
		.then(comment =>
			service.update(`/comments/${comment.id}`, {
				voteScore: comment.voteScore + 1,
			})
		);

export const downVoteComment = (id) =>
	getComment(id)
		.then(comment =>
			service.update(`/comments/${comment.id}`, {
				voteScore: comment.voteScore - 1,
			})
		);

export const editComment = ({id, timestamp, body,}) =>
	service.update(`/comments/${id}`, {timestamp, body,});

export const deleteComment = (id) =>
	service.delete(`/comments/${id}`);
