import React, { Component } from 'react';

class CommentForm extends Component {
	constructor() {
		super();
		this.state = {
			text: ''
		};
	}

	updateText = (text) => {
		this.setState({
			text,
		});
	}

	render() {
		const {onCancel, onSubmit, text} = this.props;
		return (
			<div>
				<textarea
					style={{display: 'block'}}
					onChange={(e) => this.updateText(e.target.value)}
					placeholder="Type your comment here"
					value={this.state.text || text}
				/>
				<button onClick={onCancel}>Cancel</button>
				<button onClick={() => onSubmit(this.state.text || text)}>Submit</button>
			</div>
		);
	}
}

export default CommentForm;