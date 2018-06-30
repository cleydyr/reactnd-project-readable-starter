import React, { Component } from 'react';
import { getCommentsForPost } from '../service/comment-service';

export default class CommentsList extends Component {
	render() {
		return (
			<div>
				<strong>{comment.author}</strong> says: <br/>
				<p>{comment.body}</p>
				<small>{comment.voteScore} {Math.abs(comment.voteScore) === 1 ? 'vote' : 'votes'}</small>
			</div>
		);
	}
}
