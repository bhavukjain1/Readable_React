import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react'
import { Form, TextArea } from 'semantic-ui-react'
import * as API from '../api'
import '../App.css'

export class UpdateComment extends Component {


	state = {
		open:this.props.isModalOpen,
		commentValue:this.props.selectedComment.body
	}


	componentWillReceiveProps(nextProps) {

		this.setState({
			open:nextProps.isModalOpen,
			commentValue:nextProps.selectedComment.body
		})
	}


	handleChange = (e) => {
		this.setState({
			commentValue:e.target.value
		})
	}

	updateComment = (comment) => {

		var newComment = comment
		newComment.timestamp = Date.now()
		newComment.body = this.state.commentValue

		API.updateComment(comment.id,newComment).then(comment => {
			this.props.updateComment(comment)
			this.closeModal()

		})
	}


	closeModal = () => {

		this.props.modalClosed()
	}

	render() {

		return (
			<div>
				<Modal open={this.state.open}>
   					 <Modal.Header>Update Comment</Modal.Header>
    				 <Modal.Content>
	                     <Modal.Description>
	                        <Form>
    						   <TextArea placeholder='Tell us more' value={this.state.commentValue} onChange={this.handleChange}/>
 							</Form>
							<div className='Div-Margin'>
								<Button type='submit' primary onClick={() => this.updateComment(this.props.selectedComment)}>Update</Button>
    							<Button onClick={this.closeModal} secondary>Cancel</Button>
							</div>
	                     </Modal.Description>
                     </Modal.Content>
                </Modal>
   			</div>
		);
	}
}
