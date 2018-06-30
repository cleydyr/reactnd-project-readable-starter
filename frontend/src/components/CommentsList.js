import React, { Component } from 'react';
import { getCommentsForPost } from '../service/comment-service';

export default class CommentsList extends Component {
	constructor() {
		super();
		this.state = {
			comments: [],
		};
	}
	componentDidMount() {
		getCommentsForPost(this.props.postId)
			.then(comments => this.setState({
				comments,
			}));
	}

	render() {
		const {comments} = this.state;
		return (
			<div>
				{comments.length ?
					comments.map(comment => (
						<div key={comment.id}>
							<strong>{comment.author}</strong> says: <br/>
							<p>{comment.body}</p>
							<small>{comment.voteScore} {Math.abs(comment.voteScore) === 1 ? 'vote' : 'votes'}</small>
						</div>
					))
					: 'No comments yet.'
				}
			</div>
		);
	}
}