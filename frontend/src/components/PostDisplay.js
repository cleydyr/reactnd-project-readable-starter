import React, { Component } from 'react';
import CommentsList from './CommentsList';
import AddCommentButton from './AddCommentButton';
import CommentForm from './CommentForm';
import {connect} from 'react-redux';
import { downVotePost, upVotePost, addComment } from '../actions';
import VoteControl from './VoteControl';
import EditDeletePostButton from './EditDeletePostButton';

class PostDisplay extends Component {
	constructor() {
		super();
		this.state = {
			commentEdit: false,
		};
	}

	addComment = (body) => {
		const {dispatchComment, post} = this.props;

		dispatchComment(post.id)(body)
			.then(this.cancelComment);
	};

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

	downVotePost = () => {
		this.props.dispatchDownVotePost(this.props.post.id);
	}

	upVotePost = () => {
		this.props.dispatchUpVotePost(this.props.post.id);
	}

	render() {
		const {title, voteScore, author, body, timestamp, id} = this.props.post;
		return (
			<div>
				<h1>{title}</h1>
				<em>by {author}</em>
				<small>Published {(new Date(timestamp)).toUTCString()}</small><br/>
				<VoteControl
					voteScore={voteScore}
					onDownVote={this.downVotePost}
					onUpVote={this.upVotePost}
				/>
				<EditDeletePostButton id={id} />
				<p style={{whiteSpace: 'pre-wrap'}}>{body}</p>
				<hr/>
				<CommentsList postId={id}/>
				{
					this.state.commentEdit
					? <CommentForm onCancel={this.cancelComment} onSubmit={this.addComment}/>
					: <AddCommentButton onClick={this.showCommentForm}/>
				}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	dispatchDownVotePost: postId => dispatch(downVotePost({postId})),
	dispatchUpVotePost: postId => dispatch(upVotePost({postId})),
	dispatchComment: postId => body =>
		dispatch(addComment({postId, body})),
});

export default connect(null, mapDispatchToProps)(PostDisplay);