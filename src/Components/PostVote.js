import React, { Component } from 'react';
import '../App.css';
import * as API from '../api'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updatePost } from '../Actions'

class PostVote extends Component {

	onButtonAction(vote) {
		API.updateVote(this.props.post.id,vote).then(post => {
			this.props.updatePost(post)
		})
	}

	render() {
		const {post} = this.props
		return (
			<div className='Post-Vote' id='Post-Vote'>
				<button className='fa fa-arrow-up' onClick={() => this.onButtonAction('upVote')}></button>
				<label>{post.voteScore}</label>
				<button className='fa fa-arrow-down' onClick={() => this.onButtonAction('downVote')}></button>
			</div>
		);
	}
}




function mapDispatchToProps (dispatch) {
  return {
    updatePost: (data) => dispatch(updatePost(data))
      }
}



export default withRouter(connect(
	null,
  	mapDispatchToProps
)(PostVote))


