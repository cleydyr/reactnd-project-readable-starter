import React from 'react';
import CategoryList from './CategoryList';
import PostList from './PostList';
import AddPostButton from './AddPostButton';

export default function(props) {
	const {categoryName, categories, posts} = props;
	return (
		<React.Fragment>
			<h3>Categories</h3>
			<CategoryList categories={categories}/>
			<h3>Posts</h3>
			<PostList posts={posts.filter(post => !categoryName || post.category === categoryName)}/>
			<AddPostButton/>
		</React.Fragment>
	);
}