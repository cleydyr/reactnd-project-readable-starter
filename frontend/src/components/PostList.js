import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostItem from './PostItem';

class PostList extends Component {
	render() {
		const {posts, comments} = this.props;
		const postsWithCommentCount = posts.map(post => ({
			...post,
			commentCount: comments.filter(comment => comment.parentId === post.id).length,
		}));

		return (
			<ul>
				{postsWithCommentCount.map(post => <li><PostItem {...post}/></li>)}
			</ul>
		);
	}
}

const mapStateToProps = (state) => ({
	comments: state.comments,
});

export default connect(mapStateToProps)(PostList);