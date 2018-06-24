import React, { Component } from 'react';
import './App.css';
import CategoryList from './components/CategoryList';
import PostList from './components/PostList';
import { getCategories } from './service/categories-service';
import { getPosts } from './service/post-service';
import {Route} from 'react-router-dom';

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
		<Route path="/category/:name"
			render={({match}) => (
				<PostList posts={this.state.posts} category={match.params.name}/>
			)}
		/>
      </div>
    );
  }
}

export default App;
