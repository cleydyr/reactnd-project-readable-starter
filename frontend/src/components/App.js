import React, { Component } from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import PostDisplay from './PostDisplay';
import RootDisplay from './RootDisplay';
import {connect} from 'react-redux';
import {fetchPosts, fetchCategories} from '../actions';

class App extends Component {
  componentDidMount() {
	const {doFetchCategories, doFetchPosts} = this.props;

	doFetchCategories();
	doFetchPosts();
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
		<h1><Link to="/">Readable App</Link></h1>
		<Route exact path="/" render={postListWithCategory} />
		<Route path="/category/:name"
			render={postListWithCategory}
		/>
		<Route path="/post/:id" render={
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
	doFetchCategories: () => dispatch(fetchCategories()),
	doFetchPosts: () =>	dispatch(fetchPosts()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
