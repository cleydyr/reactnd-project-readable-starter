import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchComments, upVoteComment, downVoteComment } from '../actions';
import CommentsDisplay from './CommentDisplay';

class CommentsList extends Component {

	render() {
		const {comments, dispatchDownVoteComment, dispatchUpVoteComment} = this.props;
		return (
			<div>
				<h2>Comments</h2>
				{comments && comments.length
					?
						<React.Fragment>
							<h5>{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</h5>
								{comments.map(comment =>
									<CommentsDisplay
										comment={comment}
										key={comment.id}
										onDownVoteComment={dispatchDownVoteComment}
										onUpVoteComment={dispatchUpVoteComment} />
								)}
						</React.Fragment>
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
	dispatchFetchComments: postId => dispatch(fetchComments({postId})),
	dispatchUpVoteComment: commentId => dispatch(upVoteComment({commentId})),
	dispatchDownVoteComment: commentId => dispatch(downVoteComment({commentId})),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);