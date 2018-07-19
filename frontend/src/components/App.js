import React, { Component } from 'react';
import {Route, Link, withRouter, Redirect, Switch} from 'react-router-dom';
import PostDisplay from './PostDisplay';
import RootDisplay from './RootDisplay';
import {connect} from 'react-redux';
import {fetchPosts, fetchCategories, deletePost} from '../actions';
import PostForm from './PostForm';
import {
	NEW_POST,
	CATEGORY,
	POST,
	HOME,
	EDIT_POST,
	DELETE_POST,
} from '../util/routes';

class App extends Component {
  componentDidMount() {
	const {dispatchFetchCategories, dispatchFetchPosts} = this.props;

	dispatchFetchCategories();
	dispatchFetchPosts();
  }

  render() {
	const {posts, categories, dispatchDeletePost} = this.props;

	const postListWithCategory = ({match}) => (
		<RootDisplay
			posts={posts}
			categories={categories}
			categoryName={match.params && match.params.category}
		/>
	);

    return (
      <div>
		<h1><Link to={HOME}>Readable App</Link></h1>

		<Switch>
			<Route path={DELETE_POST} render={({match}) => {
				dispatchDeletePost(match.params.id);
				return <Redirect to={HOME} />
			}} />

			<Route path={POST} render={
				({match}) => posts.length &&
					<PostDisplay post={
						posts.find(post => post.id === match.params.post_id)
					}/>
			}/>

			<Route exact path={HOME} render={postListWithCategory} />

			<Route exact path={NEW_POST} component={PostForm}/>

			<Route path={EDIT_POST} component={PostForm} />

			<Route path={CATEGORY}
				render={postListWithCategory}
			/>
		</Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
	posts: state.posts,
	categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
	dispatchFetchCategories: () => dispatch(fetchCategories()),
	dispatchFetchPosts: () => dispatch(fetchPosts()),
	dispatchDeletePost: postId => dispatch(deletePost({postId})),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
