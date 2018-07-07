import {
	actions,
} from '../actions';

const initialState = {
	posts: [],
	categories: [],
	comments: [],
}

export default function reducer(state = initialState, action) {
	switch(action.type) {
		case actions.UPDATE_DATA:
			const {posts, categories,} = action;

			return {
				...state,
				posts,
				categories,
			};

		default:
			return state;
	}
}