export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'

export function createPost({id,text}) {
	return {
		type: CREATE_POST,
		id,
		text
	}
}

export function deletePost({id}) {
	return {
		type: DELETE_POST,
		id
	}
}