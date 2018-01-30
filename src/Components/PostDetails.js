import React, { Component } from 'react';
import '../App.css';
import { Item } from 'semantic-ui-react'
import CommentList from './CommentList'
import PostVote from './PostVote'

class PostDetails extends Component {

	render() {

		const {post} = this.props

		return (
			<div className='Post-Detail'>
				<Item.Group>
    				<Item>
    					<PostVote post={post}/>
     					<Item.Content>
     					   <Item.Header as='a'>{post.title}</Item.Header>
     					   <Item.Meta>
          						<span className='cinema'>{post.author}</span>
        					</Item.Meta>
       					   <Item.Meta>{post.body}</Item.Meta>
                        </Item.Content>
                    </Item>
                </Item.Group>

				<CommentList post={post}/>
			</div>
		);
	}
}

export default PostDetails
