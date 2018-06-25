import React, { Component } from 'react';
import './App.css';
import CategoryList from './components/CategoryList';
import PostList from './components/PostList';
import { getCategories } from './service/categories-service';
import { getPosts } from './service/post-service';
import {Route} from 'react-router-dom';
import PostDisplay from './components/PostDisplay';

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
	const postListWithCategory = ({match}) => (
		<div>
			<CategoryList categories={this.state.categories}/>
			<PostList posts={this.state.posts} category={match && match.params && match.params.name}/>
		</div>
	);
    return (
      <div className="App">
		<Route exact path="/" render={postListWithCategory} />
		<Route path="/category/:name"
			render={postListWithCategory}
		/>
		<Route path="/post/:id" render={
			({match}) => this.state.posts.length && <PostDisplay post={this.state.posts.find(post => post.id === match.params.id)}/>
		}/>
      </div>
    );
  }
}

export default App;
