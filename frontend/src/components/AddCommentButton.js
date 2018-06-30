import React, { Component } from 'react';

export default class AddCommentButton extends Component {
	render() {
		return (
			<button {...this.props}>Add comment</button>
		);
	}
}