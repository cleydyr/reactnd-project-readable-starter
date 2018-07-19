import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostItem from './PostItem';

class PostList extends Component {
	static ordering = {
		ASCENDING: 1,
		DESCENDING: -1,
	}

	static orderBy = {
		PUBLISHED: 'timestamp',
		VOTED: 'voteScore',
	}

	constructor() {
		super();
		this.state = {
			orderBy: PostList.orderBy.PUBLISHED,
			orderType: PostList.ordering.ASCENDING,
		};
	}

	orderPostsField = (orderBy) => {
		this.setState({
			orderBy,
		});
	}

	orderPostsOrdering = (orderType) => {
		this.setState({
			orderType,
		});
	}

	render() {
		const {posts, comments} = this.props;
		const {orderBy, orderType} = this.state;

		const postsOrderedWithCommentCount = posts.map(post => ({
			...post,
			commentCount: comments.filter(
				comment => comment.parentId === post.id).length,
		})).sort((p1, p2) => orderType*(p1[orderBy] - p2[orderBy]));

		return (
			<React.Fragment>
				<div>
					Order by: <select onChange={(e) => this.orderPostsField(e.target.value)}>
						<option value={PostList.orderBy.PUBLISHED}>Published</option>
						<option value={PostList.orderBy.VOTED}>Voted</option>
					</select>
					<select onChange={(e) => this.orderPostsOrdering(e.target.value)}>
						<option value={PostList.ordering.ASCENDING}>Ascending</option>
						<option value={PostList.ordering.DESCENDING}>Descending</option>
					</select>
				</div>
				<ul>
					{postsOrderedWithCommentCount.map(
							post => <li key={post.id}><PostItem {...post}/></li>)}
				</ul>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	comments: state.comments,
});

export default connect(mapStateToProps)(PostList);