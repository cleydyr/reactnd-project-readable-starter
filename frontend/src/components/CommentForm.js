import React, { Component } from 'react';
import { addComment } from '../actions';
import {connect} from 'react-redux';

class CommentForm extends Component {
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
		const {dispatchComment, postId, onCancel} = this.props;

		dispatchComment(postId)(body);

		onCancel();
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

const mapDispatchToProps = dispatch => ({
	dispatchComment: postId => body =>
		dispatch(addComment({postId, body})),
});

export default connect(null, mapDispatchToProps)(CommentForm);