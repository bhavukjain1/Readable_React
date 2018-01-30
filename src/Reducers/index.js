import { combineReducers } from 'redux'

import {
	CREATE_POST,
	DELETE_POST,
	UPDATE_CATEGORIES,
	UPDATE_POST
} from '../Actions'



function posts(state=[], action) {

	switch(action.type) {
		case CREATE_POST:
			return [action,...state]
		case DELETE_POST:
			return state.filter(post => post.id != action.id)
		case UPDATE_POST:
			var postIndex = state.map(x => x.id).indexOf(action.id)
			var newState  = [...state]
			newState[postIndex] = action
			return newState

		default:
			return state
	}
}


function categories(state=[], action) {
	switch(action.type) {
		case UPDATE_CATEGORIES:
			return [action,...state]
		default:
			return state
	}
}

export default combineReducers({
	posts,
	categories
})