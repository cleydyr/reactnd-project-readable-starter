import {
	actions,
} from '../actions';

const initialState = {
	posts: [],
	categories: [],
	comments: [],
}

export default function reducer(state = initialState, action) {
	const {
		posts,
		categories,
		comments,
		comment,
		commentId,
		postId,
		post,
	} = action;

	switch(action.type) {
		case actions.UPDATE_POSTS:

			return {
				...state,
				posts,
			};

		case actions.UPDATE_CATEGORIES:

			return {
				...state,
				categories,
			};

		case actions.UPDATE_COMMENTS:

			return {
				...state,
				comments: [...state.comments, ...comments.filter(
					c => !state.comments.find(sc => sc.id === c.id))],
			};

		case actions.ADD_COMMENT:

			return {
				...state,
				comments: [...state.comments, comment],
			};

		case actions.UPVOTE_COMMENT:

			return {
				...state,
				comments: state.comments.map(
					comment => comment.id === commentId
						? {...comment, voteScore: comment.voteScore + 1, } : comment),
			};

		case actions.DOWNVOTE_COMMENT:

			return {
				...state,
				comments: state.comments.map(
					comment => comment.id === commentId
						? {...comment, voteScore: comment.voteScore - 1, } : comment),
			};

		case actions.DOWNVOTE_POST:

			return {
				...state,
				posts: state.posts.map(
					post => post.id === postId
						? {...post, voteScore: post.voteScore - 1, } : post),
			};

		case actions.UPVOTE_POST:

			return {
				...state,
				posts: state.posts.map(
					post => post.id === postId
						? {...post, voteScore: post.voteScore + 1, } : post),
			};

		case actions.ADD_POST:

			return {
				...state,
				posts: [...state.posts, post],
			};

		case actions.EDIT_POST:

			return {
				...state,
				posts: state.posts.map(p => p.id === post.id ? {...p, ...post} : p),
			};

		case actions.DELETE_POST:

			return {
				...state,
				posts: state.posts.filter(p => p.id !== postId),
			}

		case actions.EDIT_COMMENT:

			return {
				...state,
				comments: state.comments.map(
					c => c.id === comment.id ? {...c, ...comment} : c),
			}

		case actions.DELETE_COMMENT:

			return {
				...state,
				comments: state.comments.filter(c => c.id !== commentId),
			}

		default:
			return state;
	}
}