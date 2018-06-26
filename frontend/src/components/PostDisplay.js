import React, { Component } from 'react';

export default class PostDisplay extends Component {
	render() {
		const {title, voteScore, author, body, timestamp} = this.props.post;
		return (<div>
			<h1>{title} ({voteScore})</h1>
			<em>by {author}</em>
			<p>{body}</p>
			<tiny>Published {(new Date(timestamp)).toUTCString()}</tiny>	.
		</div>);
	}
}