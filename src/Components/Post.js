import React, { Component } from 'react';
import '../App.css';
import PostDetails from './PostDetails'
import { Button, Icon, Item, Label } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'


class Post extends Component {

	static propTypes = {
   		posts: PropTypes.array.isRequired
   	}


  postDetailsButton = (e) => {


  }

	render() {

		const {posts} = this.props
		console.log(posts)
		return (
			<div className="Post-Content">

          <Item.Group divided>

          {posts.map(post => (
            <Item key={post.id}>
                  <Item.Content>
                  <Item.Header as='a'>{post.title}</Item.Header>
                  <Item.Meta>
                      <span className='cinema'>{post.author}</span>
                  </Item.Meta>
                  <Item.Extra>
                      <Link to={`/post/${post.id}`} params={post}>
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

export default Post
