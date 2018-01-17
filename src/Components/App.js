import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { connect } from 'react-redux'
import { createPost, deletePost } from '../Actions'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import CreatePost from './CreatePost'

class App extends Component {

  render() {
    const { posts,createPost,deletePost } = this.props
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
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
