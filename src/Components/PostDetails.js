import React, { Component } from 'react';
import { Item } from 'semantic-ui-react'
import CommentList from './CommentList'
import '../App.css';

class PostDetails extends Component {

	render() {

		const {post} = this.props

		return (
			<div className='Post-Detail'>
				<Item.Group>
    				<Item>
     					<Item.Content>
     					   <Item.Header as='a'>{post.title}</Item.Header>
     					   <Item.Meta>
          						<span className='cinema'>{post.author}</span>
        					</Item.Meta>
       					   <Item.Meta>{post.description}</Item.Meta>
                        </Item.Content>
                    </Item>
                </Item.Group>

				<CommentList />
			</div>
		);
	}
}

export default PostDetails
