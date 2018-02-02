import React, { Component } from 'react'
import '../App.css';
import * as API from '../api'

export function CommentVote(props)  {

	const {comment,updateComment,comment:{id}} = props

	function onButtonAction(vote) {
		API.updateVoteComment(id,vote).then(comment => {
			updateComment(comment)
		})
	}

	return (
		<div className='Post-Vote' id='Post-Vote'>
			<button className='fa fa-arrow-up' onClick={() => onButtonAction('upVote')}></button>
			<label>{comment.voteScore}</label>
			<button className='fa fa-arrow-down' onClick={() => onButtonAction('downVote')}></button>
		</div>
	)
}
