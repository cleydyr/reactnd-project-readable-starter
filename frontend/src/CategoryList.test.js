import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';
import CategoryList from './components/CategoryList';

describe('CategoryList tests', () => {
	it('should have only one ul element', () => {
		const categories = [];
		const wrapper = shallow(
			<CategoryList categories={categories} />
		);

		return expect(wrapper.is('ul')).toBe(true);
	});

	it(`should have as many one li's elements as the size of the category props
		passed to it`, () => {
		const categories = [
			{
				name: 'foo',
				path: 'foo',
			},
			{
				name: 'bar',
				path: 'bar',
			},
			{
				name: 'zan',
				path: 'zan',
			},
		];

		const wrapper = shallow(
			<CategoryList categories={categories} />
		);

		return expect(wrapper.children().find('li').length).toBe(3);
	});
});
