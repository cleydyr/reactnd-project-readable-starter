import React, { Component } from 'react';

export default class ComponentList extends Component {
	render() {
		const {posts} = this.props;
		return (
			<ul>
				{posts.map(post => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>
		);
	}
}