import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import * as API from '../api'
import {CommentVote} from './CommentVote'

class CommentList extends Component {


  state = {
    comments:[],
    createCommentText:''
  }

  componentDidMount() {

      API.getComments(this.props.post.id).then(comments => {
          this.setState({
            comments:comments
          })
      })
  }

  updateComment = (comment) => {

      var commentIndex = this.state.comments.map(x => x.id).indexOf(comment.id)

      var newComments = this.state.comments
      newComments[commentIndex] = comment
      this.setState({
            comments: newComments
      })
  }

  handleChange = (e) => {

    this.setState({
      createCommentText:e.target.value
    })
  }

  submitComment = () => {

      const {createCommentText} = this.state
      console.log(createCommentText)
      var comment = {id:makeid(),timestamp:Date.now(),body:this.state.createCommentText,author:'Bhavuk',parentId:this.props.post.id}
      API.createComment(comment).then(comment => {
        var newComments = this.state.comments
        newComments.push(comment)
        this.setState({
          comments:newComments,
          createCommentText:""
        })
      })
  }

	render() {

    const {post} = this.props
    const {comments} = this.state

		return (
			<div>
				<Comment.Group>
   					 <Header as='h3' dividing>Comments ({post.commentCount})</Header>

            {comments.map(comment => (

                  <Comment key={comment.id}>
                  <div id='row1'>
                    <div id="column1">
                      <CommentVote comment={comment} updateComment={this.updateComment}/>
                    </div>
                    <div id="column1">
                        <Comment.Content>
                           <Comment.Author as='a'>{comment.author}</Comment.Author>
                           <Comment.Metadata>
                              <div>{getDate(comment.timestamp)}</div>
                           </Comment.Metadata>
                           <Comment.Text>{comment.body}</Comment.Text>
                           <Comment.Actions>
                           <Comment.Action>Edit</Comment.Action>
                             <Comment.Action>Delete</Comment.Action>
                           </Comment.Actions>
                      </Comment.Content>
                   </div>
                  </div>
                 </Comment>

              ))}


    				<Form reply>
      					<Form.TextArea required onChange={this.handleChange}/>
    					<Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={this.submitComment}/>
   					</Form>
  				</Comment.Group>
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

function getDate(timestamp) {

  var d = new Date(timestamp)
  var readableDate = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()
  return readableDate
}

export default CommentList
