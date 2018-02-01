import React, { Component } from 'react';
import Header from './Header'

class PageNotFound extends Component {
	render() {
		return (
			<div>
				<Header/>
                <h1 className='Post-Detail-Top'>404 Page not found</h1>
			</div>
		);
	}
}

export default PageNotFound