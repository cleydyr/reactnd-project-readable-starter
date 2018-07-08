import React, { Component } from 'react';
import { getCommentsForPost } from '../service/comment-service';

class CommentsDisplay extends Component {
	render() {
		const {comment: {author, body, voteScore, id}, onDownVoteComment, onUpVoteComment} = this.props;

		return (
			<div>
				<strong>{author}</strong> says: <br/>
				<p>{body}</p>
				<small>
					{voteScore} {Math.abs(voteScore) === 1 ? 'vote ' : 'votes '}
					<button onClick={() => onDownVoteComment(id)}>▼</button>
					<button onClick={() => onUpVoteComment(id)}>▲</button>
				</small>
			</div>
		);
	}
}

export default CommentsDisplay;
