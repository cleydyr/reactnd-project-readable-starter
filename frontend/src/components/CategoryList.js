import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class CategoryList extends Component {
	render() {
		const {categories} = this.props;
		return (
			<ul>
				{categories && categories.map(category => (
					<li key={category.name}>
						<Link to={`/${category.name}`}>
							{category.name}
						</Link>
					</li>
				))}
			</ul>
		);
	}
}