import React, { Component } from 'react';
import '../App.css';
import { Item } from 'semantic-ui-react'
import CommentList from './CommentList'
import PostVote from './PostVote'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateCategories, createPost} from '../Actions'
import * as API from '../api'

class PostDetails extends Component {

    componentDidMount() {

        if (this.props.post == null) {
            var postId = this.props.match.params.postId
            API.getPostFromId(postId).then(post => {
                this.props.updatePosts(post)
            })
        }
    }


	render() {

        const {posts} = this.props

        var newPosts = posts.filter(post => post.id === this.props.match.params.postId)

		return (
			<div className='Post-Detail'>
                {newPosts.length > 0 &&
                    <div>
        				<Item.Group>
            				<Item>
            					<PostVote post={newPosts[0]}/>
             					<Item.Content>
             					   <Item.Header as='a'>{newPosts[0].title}</Item.Header>
             					   <Item.Meta>
                  						<span className='cinema'>{newPosts[0].author}</span>
                					</Item.Meta>
               					   <Item.Meta>{newPosts[0].body}</Item.Meta>
                                </Item.Content>
                            </Item>
                        </Item.Group>
        				<CommentList post={newPosts[0]}/>
                    </div>
                }
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    categories: state.categories
  }
}


function mapDispatchToProps (dispatch) {
  return {
    updateCategories: (data) => dispatch(updateCategories(data)),
    updatePosts: (data) => dispatch(createPost(data))
      }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostDetails))
