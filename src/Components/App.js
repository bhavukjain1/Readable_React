import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { connect } from 'react-redux'
import { createPost, deletePost } from '../Actions'
import CreatePost from './CreatePost'
import Post from './Post'
import { Divider } from 'semantic-ui-react'
import { Tab } from 'semantic-ui-react'

class App extends Component {

  render() {
    const { posts,createPost,deletePost } = this.props

    var panes = [
  { menuItem: 'All Posts', render: () => <Tab.Pane><Post /></Tab.Pane> },
  { menuItem: 'React Posts', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: 'Redux Posts', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
]
    return (
      <div className="App">
        <h1>Readable</h1>
        <Tab panes={panes} />

        <button onClick={() => createPost({id:123,text:'Hello'})}>Continue</button>
        <CreatePost />
      </div>
    );
  }
}


function mapStateToProps(state) {
  console.log(state)
  return {
    posts: state.posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createPost: (data) => dispatch(createPost(data)),
    deletePost: (data) => dispatch(deletePost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
