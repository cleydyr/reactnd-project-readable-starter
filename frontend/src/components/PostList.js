import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';

class PostList extends Component {
	render() {
		const {posts, comments} = this.props;
		const postsWithCommentCount = posts.map(post => ({
			...post,
			commentCount: comments.filter(comment => comment.parentId === post.id).length,
		}));

		return (
			<ul>
				{
					postsWithCommentCount
						.map(({id, title, author, timestamp, voteScore, commentCount}) => (
							<li key={id}>
								<Link to={`/post/${id}`}>
									<h3>{title}</h3>
								</Link>
								<div><em>Published {(new Date(timestamp)).toUTCString()} by <strong>{author}</strong></em></div>
								<div><em>({voteScore} {Math.abs(voteScore) === 1 ? 'vote, ' : 'votes, '}
									{commentCount} {Math.abs(commentCount) === 1 ? 'comment ' : 'comments '})</em></div>
								<small></small>
							</li>))}
			</ul>
		);
	}
}

const mapStateToProps = (state) => ({
	comments: state.comments,
});

export default connect(mapStateToProps)(PostList);