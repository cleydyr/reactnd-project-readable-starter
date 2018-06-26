import React, { Component } from 'react';
import './App.css';
import { getCategories } from './service/categories-service';
import { getPosts } from './service/post-service';
import {Route} from 'react-router-dom';
import PostDisplay from './components/PostDisplay';
import RootDisplay from './components/RootDisplay';

class App extends Component {
  constructor() {
	  super();
	  this.state = {
		  categories: [],
		  posts: [],
	  };

  }

  componentDidMount() {
	Promise.all(
		[
			getCategories(),
			getPosts(),
		]
	)
		.then(([{categories}, posts]) => this.setState({
			categories,
			posts,
		}))
  }

  render() {
	const {posts, categories} = this.state;

	const postListWithCategory = ({match}) => (
		<RootDisplay
			posts={posts}
			categories={categories}
			categoryName={match.params && match.params.name}
		/>
	);

    return (
      <div className="App">
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

export default App;
