import React, {Component} from 'react';
import {Link} from "react-router-dom";
import VoteControl from './VoteControl';
import {connect} from 'react-redux';
import { downVotePost, upVotePost } from '../actions';

class PostItem extends Component {

	downVotePost = () => {
		this.props.dispatchDownVotePost(this.props.id);
	}

	upVotePost = () => {
		this.props.dispatchUpVotePost(this.props.id);
	}

	render() {
		const {id, title, author, timestamp, voteScore, commentCount} = this.props;
		return (
			<React.Fragment>
				<Link to={`/post/${id}`}>
					<h3>{title}</h3>
				</Link>
				<div><em>Published {(new Date(timestamp)).toUTCString()} by <strong>{author}</strong></em></div>
				<div><em>({voteScore} {Math.abs(voteScore) === 1 ? 'vote, ' : 'votes, '}
					{commentCount} {Math.abs(commentCount) === 1 ? 'comment ' : 'comments '})</em></div>
				<VoteControl
						voteScore={voteScore}
						onDownVote={this.downVotePost}
						onUpVote={this.upVotePost}
				/>
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	dispatchDownVotePost: postId => dispatch(downVotePost({postId})),
	dispatchUpVotePost: postId => dispatch(upVotePost({postId})),
});

export default connect(null, mapDispatchToProps)(PostItem);