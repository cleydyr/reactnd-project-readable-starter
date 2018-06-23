const {
	READABLE_API_URL,
	READABLE_API_TOKEN,
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
		uri: `${READABLE_API_URL}${path}`,
		headers: {
			'Accept': 'application/json',
			'Authorization': READABLE_API_TOKEN,
			'Content-Type': 'application/json',
		},
		json: true,
	};
};

export {methods};