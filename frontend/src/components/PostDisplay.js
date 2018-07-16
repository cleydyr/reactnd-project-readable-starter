import React, { Component } from 'react';
import CommentsList from './CommentsList';
import AddCommentButton from './AddCommentButton';
import CommentForm from './CommentForm';
import {connect} from 'react-redux';
import { downVotePost, upVotePost } from '../actions';

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

	render() {
		const {title, voteScore, author, body, timestamp, id} = this.props.post;
		return (
			<div>
				<h1>{title}</h1>
				<em>by {author}</em>
				<p>{body}</p>
				<small>Published {(new Date(timestamp)).toUTCString()}</small><br/>
				<small><strong>{voteScore} {Math.abs(voteScore) === 1 ? 'vote ' : 'votes '}</strong></small>
				<button onClick={() => this.props.dispatchDownVotePost(id)}>▼</button>
				<button onClick={() => this.props.dispatchUpVotePost(id)}>▲</button>
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