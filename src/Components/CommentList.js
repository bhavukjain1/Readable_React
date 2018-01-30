import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import * as API from '../api'
import {CommentVote} from './CommentVote'

class CommentList extends Component {


  state = {
    comments:[]
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

	render() {

    const {post} = this.props
    const {comments} = this.state

    console.log(comments)
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
      					<Form.TextArea />
    					<Button content='Add Reply' labelPosition='left' icon='edit' primary />
   					</Form>
  				</Comment.Group>
			</div>
		);
	}
}

function getDate(timestamp) {

  var d = new Date(timestamp)
  var readableDate = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()
  return readableDate
}

export default CommentList
