import React, { Component } from 'react';
import {connect} from 'react-redux';
import CommentsDisplay from './CommentDisplay';

class CommentsList extends Component {

	render() {
		const {comments} = this.props;
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
									/>
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


export default connect(mapStateToProps)(CommentsList);