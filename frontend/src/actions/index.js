import uuidv1 from 'uuid/v1';
import {
	addComment as serviceAddComment,
	upVoteComment as serviceUpvoteComment,
	downVoteComment as serviceDownVoteComment,
	getCommentsForPost,
} from '../service/wedeploy-comment-service';
import { getCategories } from '../service/wedeploy-categories-service';
import {
	getPosts,
	upVotePost as serviceUpvotePost,
	downVotePost as serviceDownvotePost,
	addPost as serviceAddPost,
} from '../service/wedeploy-post-service';

const actionList = [
	'ADD_COMMENT',
	'UPVOTE_COMMENT',
	'DOWNVOTE_COMMENT',
	'UPVOTE_POST',
	'DOWNVOTE_POST',
	'UPDATE_COMMENTS',
	'UPDATE_POSTS',
	'UPDATE_CATEGORIES',
	'ADD_POST',
];

export const actions = actionList.reduce(
	(acc, cur) =>
		({
			...acc,
			[cur]: cur,
		}),

	{});

export function upVotePost({postId}) {
	return dispatch => serviceUpvotePost(postId)
		.then(() => dispatch({
			type: actions.UPVOTE_POST,
			postId,
		}));
}

export function downVotePost({postId}) {
	return dispatch => serviceDownvotePost(postId)
		.then(() => dispatch({
			type: actions.DOWNVOTE_POST,
			postId,
		}));
}

export function upVoteComment({commentId}) {
	return dispatch => serviceUpvoteComment(commentId)
		.then(() => dispatch({
			type: actions.UPVOTE_COMMENT,
			commentId,
		}));
}

export function downVoteComment({commentId}) {
	return dispatch => serviceDownVoteComment(commentId)
		.then(() => dispatch({
			type: actions.DOWNVOTE_COMMENT,
			commentId,
		}));
}

export function fetchPosts() {
	return dispatch => getPosts()
		.then(posts =>
			Promise.all(
				posts.map(post =>
					getCommentsForPost(post.id)
						.then(comments => dispatch(mergeCommentsList({comments})))
				)
			)
			.then(dispatch(updatePosts({posts})))
		);
}

export function fetchCategories() {
	return dispatch =>  {
		return getCategories()
			.then((categories) => dispatch(updateCategories({categories})));
	}
}

export function fetchComments({postId}) {
	return dispatch =>  {
		return getCommentsForPost(postId)
			.then(comments => dispatch(updateCommentsList({comments,})));
	}
}

export function updateCategories({categories}) {
	return {
		type: actions.UPDATE_CATEGORIES,
		categories,
	}
}

export function updatePosts({posts}) {
	return {
		type: actions.UPDATE_POSTS,
		posts,
	}
}

export function mergeCommentsList({comments,}) {
	return {
		type: actions.UPDATE_COMMENTS,
		comments,
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

	return dispatch =>
		serviceAddComment(comment)
			.then(comment => dispatch({
				type: actions.ADD_COMMENT,
				comment,
			}));
}

export function addPost({title, body, category}) {
	const newPost = {
		id: uuidv1(),
		timestamp: Date.now(),
		title,
		body,
		author: 'theuser',
		category,
		voteScore: 0,
		deleted: false,
	};

	return dispatch =>
		serviceAddPost(newPost)
			.then(post => dispatch({
				type: actions.ADD_POST,
				post,
			}));
}