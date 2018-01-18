import React, { Component } from 'react';
import '../App.css';
import PostDetails from './PostDetails'
import { connect } from 'react-redux'
import CreatePost from './CreatePost'
import Post from './Post'
import { Tab } from 'semantic-ui-react'
import { Route, Link } from 'react-router-dom'

class App extends Component {

  render() {
    const { posts } = this.props

    var panes = [
  { menuItem: 'All Posts', render: () => <Tab.Pane><Post posts={posts}/></Tab.Pane> },
  { menuItem: 'React Posts', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: 'Redux Posts', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
]
    return (
      <div className="App">
        <Route exact path='/' render={() => (
             <div>
                <h1>Readable</h1>
                <Tab panes={panes} />
                <CreatePost />
             </div>
          )}
        />

        <Route path="/post/:postId" component={Here}/>
      </div>
    );
  }
}


const Here = (props) => {

  console.log(props)
  return <div className='App'>
            <PostDetails
                post={{ author: 'dsvsss', title: 'dsfdsfsfdf', description: 'dsfdsfsfdsf', category: 'React'}}
             />
        </div>
}


function mapStateToProps(state) {
  console.log(state)
  return {
    posts: state.posts
  }
}


export default connect(
  mapStateToProps
)(App)
