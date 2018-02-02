import React from 'react';
import { Link } from 'react-router-dom'

function Header() {

	return (
   		   <div className='search-books-bar'>
   		   <div className="link-header">
			 <Link to='/'>Home</Link>
		   </div>
		   </div>
	)
}

export default Header
