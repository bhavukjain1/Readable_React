import { combineReducers } from 'redux'

import {
	CREATE_POST,
	DELETE_POST
} from '../Actions'


const initialState = {

	posts:[]
}

function posts(state=[], action) {
	switch(action.type) {
		case CREATE_POST:
			var post = {id:action.id, text:action.text}
			return [post,...state]
		case DELETE_POST:
			return state.filter(post => post.id !== action.id)
		default:
			return state
	}
}

export default combineReducers({
	posts
})