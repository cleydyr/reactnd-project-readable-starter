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

	updateCategory = (category) => {
		this.setState({
			category,
		});
	}

	goHome = () => {
		this.setState({redirect: true});
	}

	addPost = ({body, title, category}) => {
		const {dispatchNewPost,} = this.props;

		dispatchNewPost({body, title, category})
			.then(this.goHome);
	};

	render() {
		const {categories, selCategory} = this.props;
		return (
			this.state.redirect ?
			<Redirect to={HOME} /> :
			<div>
				<div>Title: <textarea onChange={(e) => this.updateTitle(e.target.value)}></textarea></div>
				<div>Body: <textarea onChange={(e) => this.updateBody(e.target.value)}></textarea></div>

				<div>
					Category:&nbsp;
					<select onChange={e => this.updateCategory(e.target.value)}>
						{categories && categories.length &&
							categories.map(cat => <option key={cat.id} selected={selCategory}>{cat.name}</option>)
						};
					</select>
				</div>

				<button onClick={() => this.addPost(this.state)}>Submit</button>
				<button onClick={this.goHome}>Cancel</button>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	dispatchNewPost: ({title, body, category}) =>
		dispatch(addPost({title, body, category})),
});

const mapStateToProps = ({categories}) => ({
	categories,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);