import React, { Component } from 'react';
import { addComment } from '../service/comment-service';
import uuidv1 from 'uuid/v1';

export default class CommentForm extends Component {
	constructor() {
		super();
		this.state = {
			text: ''
		};
	}

	updateText = (text) => {
		this.setState({
			text,
		});
	}

	addComment = (body) => {
		addComment(
			{
				id: uuidv1(),
				timestamp: Date.now(),
				body,
				author: 'theuser',
				parentId: this.props.postId,
			}
		).then(this.props.onCancel);
	};

	render() {
		const {onCancel} = this.props;
		return (
			<React.Fragment>
				<textarea onChange={(e) => this.updateText(e.target.value)} placeholder="Type your comment here" /><br/>
				<button onClick={onCancel}>Cancel</button>
				<button onClick={() => this.addComment(this.state.text)}>Submit</button>
			</React.Fragment>
		);
	}
}