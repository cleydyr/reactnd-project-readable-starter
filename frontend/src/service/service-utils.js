const {
	REACT_APP_READABLE_API_URL,
	REACT_APP_READABLE_API_TOKEN,
} = process.env;

const methods = {
	POST: 'POST',
	PUT: 'PUT',
	GET: 'GET',
	DELETE: 'DELETE',
}

export default function getOptions(path, method = 'GET') {
	return {
		method,
		uri: `${REACT_APP_READABLE_API_URL}${path}`,
		headers: {
			'Accept': 'application/json',
			'Authorization': REACT_APP_READABLE_API_TOKEN,
			'Content-Type': 'application/json',
		},
		json: true,
	};
};

export {methods};