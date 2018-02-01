import React, { Component } from 'react';
import '../App.css';
import { Button, Icon, Item, Label } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import PostVote from './PostVote'
import * as API from '../api'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { deletePost } from '../Actions'


class Post extends Component {

	static propTypes = {
   		posts: PropTypes.array.isRequired
   	}

  deletePost = (post) => {
    API.deletePost(post.id).then(post => {
        this.props.deletePost(post)
    })
  }

  editPost = (post) => {
    this.props.postEditAction(post)
  }

	render() {
		const {posts} = this.props
		return (
			<div className="Post-Content">
          <Item.Group divided>
          {posts.map(post => (
            <Item key={post.id}>
                  <PostVote post={post}/>
                  <Item.Content>
                  <Item.Header as='a'>{post.title}</Item.Header>
                  <Item.Meta>
                      <span className='cinema'>{post.author}</span>
                      <span className='cinema'> - {getDate(post.timestamp)}</span>
                  </Item.Meta>
                  <Item.Extra>
                      <Link to={`/${post.category}/${post.id}`} params={post}>
                         <Button primary floated='right'>
                           Read More
                           <Icon name='right chevron' />
                         </Button>
                      </Link>
                      <Label>{post.category}</Label>
                  </Item.Extra>
                  </Item.Content>
              </Item>
            ))}
          </Item.Group>
			</div>
		)
	}
}

function mapDispatchToProps (dispatch) {
  return {
    deletePost: (data) => dispatch(deletePost(data))
      }
}

function getDate(timestamp) {
  var d = new Date(timestamp)
  var readableDate = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()
  return readableDate
}

export default withRouter(connect(
    null,
    mapDispatchToProps
  )(Post))
