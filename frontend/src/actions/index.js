const actionList = [
	'ADD_COMMENT',
	'UPVOTE_COMMENT',
	'DOWNVOTE_COMMENT',
	'UPVOTE_POST',
	'DOWNVOTE_POST',
	'UPDATE_DATA',
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
