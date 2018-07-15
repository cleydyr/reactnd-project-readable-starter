import React, {Component} from 'react';
import { addPost } from '../actions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { HOME } from '../util/routes';

class PostForm extends Component {
	constructor() {
		super();
		this.state = {
			body: '',
			title: '',
			redirect: false,
		};
	}

	updateBody = (body) => {
		this.setState({
			body,
		});
	}

	updateTitle = (title) => {
		this.setState({
			title,
		});
	}

	cancel = () => {
		this.setState({redirect: true});
	}

	addPost = ({body, title}) => {
		const {dispatchNewPost,} = this.props;

		dispatchNewPost({body, title,})
			.then(this.cancel);
	};

	render() {
		return (
			this.state.redirect ?
			<Redirect to={HOME} /> :
			<div>
				<div>Title: <textarea onChange={(e) => this.updateTitle(e.target.value)}></textarea></div>
				<div>Body: <textarea onChange={(e) => this.updateBody(e.target.value)}></textarea></div>
				<button onClick={() => this.addPost(this.state)}>Submit</button>
				<button onClick={this.cancel}>Cancel</button>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	dispatchNewPost: ({body, title}) =>
		dispatch(addPost({title, body})),
});

export default connect(null, mapDispatchToProps)(PostForm);