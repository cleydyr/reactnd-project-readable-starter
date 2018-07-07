import uuidv1 from 'uuid/v1';
import {addComment as serviceAddComment} from '../service/comment-service';

const actionList = [
	'ADD_COMMENT',
	'UPVOTE_COMMENT',
	'DOWNVOTE_COMMENT',
	'UPVOTE_POST',
	'DOWNVOTE_POST',
	'UPDATE_DATA',
	'UPDATE_COMMENTS_LIST',
];

export const actions = actionList.reduce(
	(acc, cur) =>
		({
			...acc,
			[cur]: cur,
		}),

	{});

export function filterPost(categoryId) {
	return {
		type: actions.FILTER_POSTS,
		categoryId,
	}
}

export function updateCategoriesAndPosts({categories, posts,}) {
	return {
		categories,
		posts,
		type: actions.UPDATE_DATA,
	}
}

export function updateCommentsList({comments,}) {
	return {
		comments,
		type: actions.UPDATE_COMMENTS_LIST,
	}
}

export function addComment({postId, body,}) {
	const comment = {
		id: uuidv1(),
		parentId: postId,
		timestamp: Date.now(),
		body,
		author: 'theuser',
		voteScore: 1,
		deleted: false,
		parentDeleted: false,
	};

	serviceAddComment(comment);

	return {
		comment,
		type: actions.ADD_COMMENT,
	}
}