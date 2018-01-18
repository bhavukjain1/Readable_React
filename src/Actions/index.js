export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'

export function createPost({id,title,description,author,category}) {
	return {
		type: CREATE_POST,
		id,
		title,
		description,
		author,
		category
	}
}

export function deletePost({id}) {
	return {
		type: DELETE_POST,
		id
	}
}