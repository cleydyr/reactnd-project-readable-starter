import React, { Component } from 'react';

export default class ComponentList extends Component {
	render() {
		const {posts, category} = this.props;
		return (
			<ul>
				{
					posts
						.filter(post => !category || post.category === category)
						.map(post => (<li key={post.id}>{post.title}</li>))}
			</ul>
		);
	}
}