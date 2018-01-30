import React, { Component } from 'react';
import '../App.css';
import PostDetails from './PostDetails'
import { connect } from 'react-redux'
import CreatePost from './CreatePost'
import Post from './Post'
import { Tab } from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import * as API from '../api'
import { updateCategories, createPost } from '../Actions'

class App extends Component {


  componentDidMount() {

    const {updateCategories,updatePosts} = this.props
     API.getCategories().then(categories => {

          for (var i = 0; i < categories.length; i++) {
            updateCategories(categories[i])
          }
     })

     API.getPosts().then(posts => {

          for (var i = 0; i < posts.length; i++) {
            updatePosts(posts[i])
          }
     })

  }



   post = (data) => {

      var postId = data.match.params.postId
      var post = this.props.posts.filter(post => post.id === postId)[0]
      return (
          <div className='App'>
            <PostDetails
                post={post}
            />
          </div>
       )
   }


  render() {
    const { posts, categories } = this.props
    var panes = []

    var newItem = { menuItem: 'All', render: () => <Tab.Pane><Post posts={posts}/></Tab.Pane> }
    panes.push(newItem)

    for (var i = 0; i < categories.length; i++) {

      let filteredPosts = posts.filter(post => post.category === categories[i].name)
      let pane = { menuItem: categories[i].name, render: () => <Tab.Pane><Post posts={filteredPosts}/></Tab.Pane> }
      panes.push(pane)
    }

    return (
      <div className="App">

      {categories.length > 0 &&

        <Route exact path='/' render={() => (
             <div>
                <h1>Readable</h1>
                <Tab panes={panes} />
                <CreatePost />
             </div>
          )}
        />
      }

        <Route path="/post/:postId" component={this.post}/>

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
)(App))
