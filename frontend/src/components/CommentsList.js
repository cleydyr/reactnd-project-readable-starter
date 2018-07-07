import React, { Component } from 'react';
import {connect} from 'react-redux';
import { updateCommentsList, fetchComments } from '../actions';

class CommentsList extends Component {

	componentDidMount() {
		const {postId, dispatchFetchComments} = this.props;
		dispatchFetchComments(postId);
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
	dispatchFetchComments: postId => dispatch(fetchComments({postId})),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);