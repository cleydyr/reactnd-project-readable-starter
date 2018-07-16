import React from 'react';
import CategoryList from './CategoryList';
import PostList from './PostList';
import AddPostButton from './AddPostButton';

export default function(props) {
	const {categoryName, categories, posts} = props;
	return (
		<React.Fragment>
			<h2>Categories</h2>
			<CategoryList categories={categories}/>
			<h2>Posts</h2>
			<PostList posts={posts.filter(post => !categoryName || post.category === categoryName)}/>
			<AddPostButton/>
		</React.Fragment>
	);
}