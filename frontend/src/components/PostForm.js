import React, {Component} from 'react';
import { addPost, editPost } from '../actions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { HOME } from '../util/routes';

class PostForm extends Component {
	constructor() {
		super();
		this.state = {};
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

	addPost = () => {
		const {body, title, category} = this.state;
		const {dispatchNewPost,} = this.props;
		const realCategory = category || this.props.selCategory || 'react';

		dispatchNewPost({body, title, category: realCategory})
			.then(this.goHome);
	};

	editPost= () => {
		const {body, title} = this.state;
		const {dispatchEditPost, post} = this.props;
		const realPost = {
			id: post.id,
			body: body || post.body,
			title: title || post.title,
		};

		dispatchEditPost(realPost)
			.then(this.goHome);
	}

	render() {
		const {categories, selCategory, post} = this.props;

		return (
			this.state.redirect ?
			<Redirect to={HOME} /> :
			<div>
				<div>Title: <textarea value={this.state.title || (post && post.title)} onChange={(e) => this.updateTitle(e.target.value)}></textarea></div>
				<div>Body: <textarea value={this.state.body || (post && post.body)} onChange={(e) => this.updateBody(e.target.value)}></textarea></div>

				<div>
					Category:&nbsp;
					<select onChange={e => this.updateCategory(e.target.value)}>
						{categories && categories.length &&
							categories.map(cat => <option key={cat.id} selected={selCategory}>{cat.name}</option>)
						};
					</select>
				</div>

				<button onClick={post ? this.editPost : this.addPost}>Submit</button>
				<button onClick={this.goHome}>Cancel</button>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	dispatchNewPost: ({title, body, category}) =>
		dispatch(addPost({title, body, category})),
	dispatchEditPost: post => dispatch(editPost({post})),
});

const mapStateToProps = ({categories, posts}, props) => ({
	categories,
	post: props.match && posts.find(post => post.id === props.match.params.id),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);