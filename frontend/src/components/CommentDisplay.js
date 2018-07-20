import React, { Component } from 'react';
import VoteControl from './VoteControl';
import {upVoteComment, downVoteComment, editComment } from '../actions';
import {connect} from 'react-redux';
import CommentForm from './CommentForm';

class CommentsDisplay extends Component {
	constructor() {
		super();
		this.state = {
			edit: false,
		}
	}

	toggleEdit = () => {
		this.setState((prevState) => ({
			edit: !prevState.edit,
		}));
	}

	editComment = (body) => {
		const {dispatchEditComment, comment: {id}} = this.props;
		dispatchEditComment(id)(body);
	}

	downVoteComment = () => {
		this.props.dispatchDownVoteComment(this.props.comment.id);
	}

	upVoteComment = () => {
		this.props.dispatchUpVoteComment(this.props.comment.id);
	}

	render() {
		const {comment: {author, body, voteScore}} = this.props;
		const {edit} = this.state;

		return (
			<div>
				<div><strong>{author}</strong> says:</div>
				<div><p style={{whiteSpace: 'pre-wrap'}}>{body}</p></div>
				<VoteControl
					voteScore={voteScore}
					onDownVote={this.downVoteComment}
					onUpVote={this.upVoteComment}
				/>
				<div>
				{
					edit ?
					<CommentForm
						text={body}
						onSubmit={this.editComment}
						onCancel={this.toggleEdit}/>
					: <button onClick={this.toggleEdit}>Edit</button>
				}
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	dispatchUpVoteComment: commentId => dispatch(upVoteComment({commentId})),
	dispatchDownVoteComment: commentId => dispatch(downVoteComment({commentId})),
	dispatchEditComment: commentId => body => dispatch(editComment({id: commentId, body})),
});

export default connect(null, mapDispatchToProps)(CommentsDisplay);
