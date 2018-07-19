import React from 'react';
import {Link} from 'react-router-dom';

export default ({id}) => (
	<div>
		<span>
			<Link to={`edit/${id}`}>Edit</Link>
		</span>
		&nbsp;
		<span>
			<Link to={`delete/${id}`}>Delete</Link>
		</span>
	</div>
);