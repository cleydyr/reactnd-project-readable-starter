import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('app tests', () => {
	let server;
	beforeAll(function () {
		server = require('../../api-server/server');
	});

	afterAll(function () {
		server.close();
	});

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});
