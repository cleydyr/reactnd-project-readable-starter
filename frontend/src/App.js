import React, { Component } from 'react';
import './App.css';
import CategoryList from './components/CategoryList';
import PostList from './components/PostList';
import { getCategories } from './service/categories-service';
import { getPosts } from './service/post-service';

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
    return (
      <div className="App">
        <CategoryList categories={this.state.categories}/>
		<PostList posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
