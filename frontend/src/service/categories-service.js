import getOptions from './service-utils';
import rp from 'request-promise';

export const getCategories = () =>
	rp(getOptions('/categories'));
