import React, { Component } from 'react';
import './Post.css'
import { Button, Icon, Image as ImageComponent, Item, Label } from 'semantic-ui-react'

export class Post extends Component {
	render() {
		return (
			<div className="Post-Content">
				<Item.Group divided>
					<Item>
      					<Item.Content>
        				<Item.Header as='a'>Account Takeover Due to Misconfigured Login with Facebook/Google</Item.Header>
        				<Item.Meta>
          					<span className='cinema'>Bhavuk Jain</span>
        				</Item.Meta>
        				<Item.Extra>
          					<Button primary floated='right'>
            					Read More
            				<Icon name='right chevron' />
          					</Button>
          					<Label>Redux</Label>
        				</Item.Extra>
      					</Item.Content>
    				</Item>
				</Item.Group>
			</div>
		);
	}
}

export default Post
