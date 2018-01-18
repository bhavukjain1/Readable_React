import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { createPost } from '../Actions'
import { Modal, Button } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { Form, TextArea } from 'semantic-ui-react'


export class CreatePost extends Component {

  state = { author: '', title: '', description: '', category: 'React', open: false }

  handleChange = (e) => {

  	this.setState({ [e.target.name]: e.target.value })
  }

  handleChangeDropdown = (e,data) => {

    console.log(data)
  	this.setState({ category: data.value })
  }


	handleSubmit = () => {
  	  const { title, description, author, category } = this.state
  	  const { createPostt, posts } = this.props

      let postId = posts.length + 1
	    createPostt({id:postId,title:title,description:description,author:author,category:category})
		this.closeModal()
 	 }

 	 openModal = () => {

 	 	this.setState({open:true})
 	 }

 	 closeModal = () => {
 	 	this.setState({open:false, category: 'React'})
 	 }


	render() {

		var friendOptions = [{
    						text: 'React',
    						value: 'React'
  							},{
    						text: 'Redux',
    						value: 'Redux'
  							}]

  		const { open } = this.state

		return (
			<div>
			<Modal trigger={<Button onClick={this.openModal} className="Button-Bottom" circular={true} secondary>+</Button>} open={open}>
				<Modal.Header>Create a Post</Modal.Header>
				<Modal.Content>
		 		  <Modal.Description>
		 		  	<div >
						<Form className="Div-Margin" onSubmit={this.handleSubmit}>
							 <Form.Field>
     							 <label>Category</label>
		   		    			 <Dropdown placeholder='Select a Category' fluid selection options={friendOptions} onChange={this.handleChangeDropdown} defaultValue={friendOptions[0].value}/>
   							 </Form.Field>
   							 <Form.Field>
      							 <label>Author</label>
     							 <input placeholder='Author' name='author' onChange={this.handleChange} required/>
   							 </Form.Field>
   							 <Form.Field>
      							 <label>Post Title</label>
      							 <input placeholder='Post Title' name="title" onChange={this.handleChange} required/>
    						</Form.Field>
    						<Form.Field>
      							 <label>Post Description</label>
      							 <TextArea placeholder='Write Something...' name="description" onChange={this.handleChange} required/>
    						</Form.Field>
    						<Button type='submit' primary>Submit</Button>
    						<Button onClick={this.closeModal} secondary>Close</Button>
  						</Form>
					</div>
		  		  </Modal.Description>
				</Modal.Content>
			</Modal>
			</div>
		);
	}
}


function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}


function mapDispatchToProps (dispatch) {
  return {
    createPostt: (data) => dispatch(createPost(data))
      }
}

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(CreatePost)