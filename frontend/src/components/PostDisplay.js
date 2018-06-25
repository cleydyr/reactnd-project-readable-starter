import React, { Component } from 'react';

export default class PostDisplay extends Component {
	render() {
		// console.log(this.props)
		const {title, voteScore, author, body} = this.props.post;
		// return <div></div>
		return (<div>
			<h1>{title} ({voteScore})</h1>
			<em>by {author}</em>
			<p>{body}</p>
		</div>);
	}
}