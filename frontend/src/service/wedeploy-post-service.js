import WeDeploy from 'wedeploy';

const service = WeDeploy
	.data(process.env.REACT_APP_READABLE_API_URL);

export const getPosts = () => service.get('/posts');

export const getPostsForCategory = (categoryId) =>
	service
		.where('category', '=', categoryId)
		.get('/posts');

export const addPost = ({id, timestamp, title, body, author, category,}) =>
	service.create('/posts', {id, timestamp, title, body, author, category,});

export const getPost = (id) =>
	service.get(`/posts/${id}`);

export const upVotePost = (id) =>
	getPost(id)
		.then(post =>
			service.update(`/posts/${post.id}`, {
				voteScore: post.voteScore + 1,
			})
		);

export const downVotePost = (id) =>
	getPost(id)
		.then(post =>
			service.update(`/posts/${post.id}`, {
				voteScore: post.voteScore - 1,
			})
		);

export const editPost = ({id, title, body,}) =>
	getPost(id)
		.then(post =>
			service.update(`/posts/${post.id}`, {
				id,
				title,
				body,
			})
		);

export const deletePost = (id) =>
	service.delete(`/posts/${id}`);
