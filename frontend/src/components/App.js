import React, { Component } from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import PostDisplay from './PostDisplay';
import RootDisplay from './RootDisplay';
import {connect} from 'react-redux';
import {fetchPosts, fetchCategories} from '../actions';
import PostForm from './PostForm';
import {
	NEW_POST,
	CATEGORY,
	POST,
	HOME,
} from '../util/routes';

class App extends Component {
  componentDidMount() {
	const {dispatchFetchCategories, dispatchFetchPosts} = this.props;

	dispatchFetchCategories();
	dispatchFetchPosts();
  }

  render() {
	const {posts, categories} = this.props;

	const postListWithCategory = ({match}) => (
		<RootDisplay
			posts={posts}
			categories={categories}
			categoryName={match.params && match.params.name}
		/>
	);

    return (
      <div>
		<h1><Link to={HOME}>Readable App</Link></h1>

		<Route exact path={HOME} render={postListWithCategory} />

		<Route path={CATEGORY}
			render={postListWithCategory}
		/>

		<Route exact path={NEW_POST} component={PostForm}/>

		<Route path={POST} render={
			({match}) => posts.length &&
				<PostDisplay post={
					posts.find(post => post.id === match.params.id)
				}/>
		}/>

      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
	posts: state.posts,
	categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
	dispatchFetchCategories: () => dispatch(fetchCategories()),
	dispatchFetchPosts: () =>	dispatch(fetchPosts()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
