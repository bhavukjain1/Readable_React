import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { createPost, updatePost } from '../Actions'
import { Modal, Button } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { Form, TextArea } from 'semantic-ui-react'
import * as API from '../api'


export class CreatePost extends Component {

  state = { author: '', title: '', description: '', category: this.props.categories[0].name, open: this.props.isModalOpen , isFirstTime:true}


  componentWillReceiveProps(newProps) {

      if (newProps.currentPost != null) {
           this.setState({
                category: newProps.currentPost.category,
                author: newProps.currentPost.author,
                title: newProps.currentPost.title,
                description: newProps.currentPost.body,
                open:true
            })
      }
  }

  handleChange = (e) => {

  	this.setState({ [e.target.name]: e.target.value })
  }

  handleChangeDropdown = (e,data) => {

    console.log(data)
  	this.setState({ category: data.value })
  }


	handleSubmit = () => {
  	  const { title, description, author, category } = this.state
  	  const { createPostt } = this.props

      if (this.props.isModalOpen) {

        let post = {title:title,body:description}
        API.updatePost(this.props.currentPost.id,post).then(post => {
            this.props.updatePost(post)
            this.closeModal()
        })

      }else {

        let postId = makeid()
        let newPost = {id:postId,title:title,body:description,author:author,category:category, timestamp:Date.now()}
        API.createPost(newPost).then(post => {
          createPostt(post)
          this.closeModal()
        })
      }
 	 }

 	 openModal = () => {

 	 	this.setState({open:true, category: this.props.categories[0].name})
 	 }

 	 closeModal = () => {
    this.props.closeModal()
 	 	this.setState({open:false, category: this.props.categories[0].name,
      author:'',title:'',description:'', isFirstTime:true})
 	 }


	render() {

  		const { open, title, description, author, category } = this.state
      const {categories, isModalOpen} = this.props

      var options = []

      for (var i = 0; i < categories.length; i++) {
        let option = {text:categories[i].name,value:categories[i].name}
        options.push(option)
      }



    var submitTitle = isModalOpen ? 'Update':'Submit'

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
		   		    			 <Dropdown placeholder='Select a Category' fluid selection options={options} onChange={this.handleChangeDropdown} defaultValue={category}/>
   							 </Form.Field>
   							 <Form.Field>
      							 <label>Author</label>
     							 <input placeholder='Author' name='author' onChange={this.handleChange} value={author} required/>
   							 </Form.Field>
   							 <Form.Field>
      							 <label>Post Title</label>
      							 <input placeholder='Post Title' name="title" onChange={this.handleChange} value={title} required/>
    						</Form.Field>
    						<Form.Field>
      							 <label>Post Description</label>
      							 <TextArea placeholder='Write Something...' name="description" onChange={this.handleChange} value={description} required/>
    						</Form.Field>
    						<Button type='submit' primary>{submitTitle}</Button>
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


function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
}


function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}


function mapDispatchToProps (dispatch) {
  return {
    createPostt: (data) => dispatch(createPost(data)),
    updatePost: (data) => dispatch(updatePost(data))
      }
}

export default connect(
	mapStateToProps,
  mapDispatchToProps
)(CreatePost)