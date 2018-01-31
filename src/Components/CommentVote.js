import React, { Component } from 'react'
import '../App.css';
import * as API from '../api'

export class CommentVote extends Component {

	onButtonAction(vote) {
		API.updateVoteComment(this.props.comment.id,vote).then(comment => {
			this.props.updateComment(comment)
		})
	}

	render() {
		const {comment} = this.props
		return (
			<div className='Post-Vote' id='Post-Vote'>
				<button className='fa fa-arrow-up' onClick={() => this.onButtonAction('upVote')}></button>
				<label>{comment.voteScore}</label>
				<button className='fa fa-arrow-down' onClick={() => this.onButtonAction('downVote')}></button>
			</div>
		);
	}
}
