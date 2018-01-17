import React, { Component } from 'react';
import './CreatePost.css'
import { Header, Image, Modal, Button } from 'semantic-ui-react'
import { Dropdown, Input } from 'semantic-ui-react'
import { Form, TextArea } from 'semantic-ui-react'


export class CreatePost extends Component {
	render() {

		var friendOptions = [{
    						text: 'Jenny Hess',
    						value: '1'
  							}]
		return (
			<div>
			<Modal trigger={<Button className="Button-Bottom" circular={true} secondary>+</Button>}>
				<Modal.Header>Create a Post</Modal.Header>
				<Modal.Content>
		 		  <Modal.Description>
		 		  	<div >
						<Form className="Div-Margin">
							 <Form.Field>
     							 <label>Category</label>
		   		    			 <Dropdown placeholder='Select a Category' fluid selection options={friendOptions} />
   							 </Form.Field>
   							 <Form.Field>
      							 <label>Author</label>
     							 <input placeholder='Author' />
   							 </Form.Field>
   							 <Form.Field>
      							 <label>Post Title</label>
      							 <input placeholder='Post Title' />
    						</Form.Field>
    						<Form.Field>
      							 <label>Post Description</label>
      							 <TextArea placeholder='Write Something...' />
    						</Form.Field>

    						<Button type='submit'>Submit</Button>
  						</Form>
					</div>
		  		  </Modal.Description>
				</Modal.Content>
			</Modal>
			</div>
		);
	}
}

export default CreatePost