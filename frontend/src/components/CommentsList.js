import React, { Component } from 'react';
import { getCommentsForPost } from '../service/comment-service';
import {connect} from 'react-redux';
import { updateCommentsList } from '../actions';

class CommentsList extends Component {

	componentDidMount() {
		const {postId, dispatchCommentsList} = this.props;

		getCommentsForPost(postId)
			.then(dispatchCommentsList);
	}

	render() {
		const {comments} = this.props;
		return (
			<div>
				{comments && comments.length ?
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

const mapStateToProps = ({comments,}, {postId}) => ({
	postId,
	comments: comments.filter(comment => comment.parentId === postId),
});

const mapDispatchToProps = dispatch => ({
	dispatchCommentsList: comments =>
		dispatch(updateCommentsList({comments})),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);