import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class PostList extends Component {
	render() {
		const {posts} = this.props;
		return (
			<ul>
				{
					posts
						.map(post => (
							<li key={post.id}>
								<Link to={`/post/${post.id}`}>
									{post.title}
								</Link>
							</li>))}
			</ul>
		);
	}
}