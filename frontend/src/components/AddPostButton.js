import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {NEW_POST} from '../util/routes';

export default class AddPostButton extends Component {
	render() {
		return (
			<Link to={NEW_POST}>Add post</Link>
		);
	}
}