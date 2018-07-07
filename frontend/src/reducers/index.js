import {
	actions,
} from '../actions';

const initialState = {
	posts: [],
	categories: [],
	comments: [],
}

export default function reducer(state = initialState, action) {
	const {posts, categories, comments, comment} = action;

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

		case actions.UPDATE_COMMENTS_LIST:

			return {
				...state,
				comments,
			};

		case actions.ADD_COMMENT:

			return {
				...state,
				comments: [...state.comments, comment],
			};

		default:
			return state;
	}
}