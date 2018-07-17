import React, { Component } from 'react';
import CommentsList from './CommentsList';
import AddCommentButton from './AddCommentButton';
import CommentForm from './CommentForm';
import {connect} from 'react-redux';
import { downVotePost, upVotePost } from '../actions';
import VoteDisplay from './VoteDisplay';

class PostDisplay extends Component {
	constructor() {
		super();
		this.state = {
			commentEdit: false,
		};
	}

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
				<p>{body}</p>
				<small>Published {(new Date(timestamp)).toUTCString()}</small><br/>
				<VoteDisplay
					voteScore={voteScore}
					onDownVote={this.downVotePost}
					onUpVote={this.upVotePost}
				/>
				<hr/>
				<CommentsList postId={id}/>
				{
					this.state.commentEdit
					? <CommentForm onCancel={this.cancelComment} postId={id}/>
					: <AddCommentButton onClick={this.showCommentForm}/>
				}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	dispatchDownVotePost: postId => dispatch(downVotePost({postId})),
	dispatchUpVotePost: postId => dispatch(upVotePost({postId})),
});

export default connect(null, mapDispatchToProps)(PostDisplay);