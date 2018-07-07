import React, { Component } from 'react';
import { getCategories } from '../service/categories-service';
import { getPosts } from '../service/post-service';
import {Route, Link, withRouter} from 'react-router-dom';
import PostDisplay from './PostDisplay';
import RootDisplay from './RootDisplay';
import {connect} from 'react-redux';
import {updateCategoriesAndPosts} from '../actions';

class App extends Component {
  componentDidMount() {
	Promise.all(
		[
			getCategories(),
			getPosts(),
		]
	)
		.then(this.props.updateCategoriesAndPosts);
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

const mapStateToProps = (store, props) => ({
	posts: store.posts,
	categories: store.categories,
});

const mapDispatchToProps = dispatch => ({
	updateCategoriesAndPosts: ([{categories}, posts,]) =>
			dispatch(updateCategoriesAndPosts({categories, posts,})),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
