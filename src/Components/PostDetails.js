import React, { Component } from 'react';
import '../App.css';
import { Item, Button } from 'semantic-ui-react'
import CommentList from './CommentList'
import PostVote from './PostVote'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateCategories, createPost, deletePost} from '../Actions'
import * as API from '../api'
import CreatePost from './CreatePost'
import Header from './Header'

class PostDetails extends Component {


  state = {
    isModalOpen:false,
    gotError:false
  }

    componentDidMount() {
        if (this.props.post == null) {
            var postId = this.props.match.params.postId
            API.getPostFromId(postId).then(post => {
                if (post.error == null) {
                this.props.updatePosts(post)
              }else {
                this.setState({
                  gotError:true
                })
              }
            })
        }
    }



  deletePost = (post) => {
    API.deletePost(post.id).then(post => {
        this.props.deletePost(post)
    })
  }


  closeModal = () => {
      this.setState({
        isModalOpen:false
      })
   }

  editPost = (post) => {
    this.setState({
        isModalOpen:true
      })
  }

	render() {
        const {posts,categories} = this.props
        var newPosts = posts.filter(post => post.id === this.props.match.params.postId)
		return (
			<div className='Post-Detail'>
            <div>
            <Header/>
            </div>
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
                    <Item.Extra>
                      <Button floated='left' onClick={() => this.editPost(newPosts[0])}>Edit</Button>
                      <Button floated='left' onClick={() => this.deletePost(newPosts[0])}>Delete</Button>
                    </Item.Extra>
                  </Item.Content>
                        </Item>
                    </Item.Group>
    				<CommentList post={newPosts[0]}/>
            <CreatePost isModalOpen={this.state.isModalOpen} closeModal={this.closeModal} currentPost={newPosts[0]}/>
                </div>
                }
              {this.state.gotError &&
                  <h1 className='Post-Detail-Top'>404 Page not found</h1>
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
    updatePosts: (data) => dispatch(createPost(data)),
    deletePost: (data) => dispatch(deletePost(data))
      }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostDetails))
