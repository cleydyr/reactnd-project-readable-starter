import React, { Component } from 'react';
import VoteDisplay from './VoteDisplay';
import {upVoteComment, downVoteComment } from '../actions';
import {connect} from 'react-redux';

class CommentsDisplay extends Component {

	downVoteComment = () => {
		this.props.dispatchDownVoteComment(this.props.comment.id);
	}

	upVoteComment = () => {
		this.props.dispatchUpVoteComment(this.props.comment.id);
	}

	render() {
		const {comment: {author, body, voteScore}} = this.props;

		return (
			<div>
				<strong>{author}</strong> says: <br/>
				<p>{body}</p>
				<VoteDisplay
					voteScore={voteScore}
					onDownVote={this.downVoteComment}
					onUpVote={this.upVoteComment}
				/>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	dispatchUpVoteComment: commentId => dispatch(upVoteComment({commentId})),
	dispatchDownVoteComment: commentId => dispatch(downVoteComment({commentId})),
});

export default connect(null, mapDispatchToProps)(CommentsDisplay);
