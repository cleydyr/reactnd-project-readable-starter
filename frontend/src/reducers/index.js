const initialState = {
	posts: [],
	categories: [],
	addComment: false,
	editComment: false,
	editPost: false,
	//editPostId: null,
	commentText: '',
}

export default function reducer(state = initialState, action) {
	switch(action.type) {
		default:
			return state;
	}
}