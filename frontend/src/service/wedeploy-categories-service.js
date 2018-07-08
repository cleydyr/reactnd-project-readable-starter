import WeDeploy from 'wedeploy';

const service = WeDeploy
	.data(process.env.REACT_APP_READABLE_API_URL);

export const getCategories = () =>
	service.get('/categories')
		.then(([{categories}]) => console.log(categories) || categories);
