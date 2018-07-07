import React, { Component } from 'react';
import CommentsList from './CommentsList';
import AddCommentButton from './AddCommentButton';
import CommentForm from './CommentForm';

class PostDisplay extends Component {
	constructor() {
		super();
		this.state = {
			commentEdit: false,
		};
	}

	showCommentForm = () => {
		this.setState({
			commentEdit: true,
		});
	}

	cancelComment = () => {
		this.setState({
			commentEdit: false,
		});
	}

	render() {
		const {title, voteScore, author, body, timestamp, id} = this.props.post;
		return (
			<div>
				<h1>{title} ({voteScore})</h1>
				<em>by {author}</em>
				<p>{body}</p>
				<small>Published {(new Date(timestamp)).toUTCString()}</small>
				<hr/>
				<h2>Comments</h2>
				<CommentsList postId={id}/>
				{
					this.state.commentEdit
					? <CommentForm onCancel={this.cancelComment} postId={id}/>
					: <AddCommentButton onClick={this.showCommentForm}/>
				}
			</div>
		);
	}
}

export default PostDisplay;