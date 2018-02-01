import React, { Component } from 'react';
import { Input, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Header extends Component {

	render() {
		return (
			<div>
       		   <div className='search-books-bar'>
       		   <div className="link-header">
				 <Link to='/'>Home</Link>
				</div>
			   </div>
			</div>
		);
	}
}

export default Header
