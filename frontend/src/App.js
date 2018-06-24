import React, { Component } from 'react';
import './App.css';
import CategoryList from './components/CategoryList';
import { getCategories } from './service/categories-service';

class App extends Component {
  constructor() {
	  super();
	  this.state = {
		  categories: [],
	  };
  }

  componentDidMount() {
	getCategories().then(({categories}) =>
		this.setState({
			categories
		})
	);
  }
  render() {
    return (
      <div className="App">
        <CategoryList categories={this.state.categories}/>
      </div>
    );
  }
}

export default App;
