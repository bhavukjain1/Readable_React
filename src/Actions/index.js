export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES'
export const UPDATE_POST = 'UPDATE_POST'

export function createPost({id,title,body,author,category,voteScore,commentCount,timestamp}) {
	return {
		type: CREATE_POST,
		id,
		title,
		body,
		author,
		category,
		voteScore,
		commentCount,
		timestamp
	}
}


export function updatePost({id,title,body,author,category,voteScore,commentCount}) {
	return {
		type: UPDATE_POST,
		id,
		title,
		body,
		author,
		category,
		voteScore,
		commentCount
	}
}

export function deletePost({id}) {
	return {
		type: DELETE_POST,
		id
	}
}

export function updateCategories({name,path}) {
	return {
		type: UPDATE_CATEGORIES,
		name,
		path
	}

}