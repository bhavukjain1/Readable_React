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
import { Select } from 'semantic-ui-react'
import { Link, Switch } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import Header from './Header'

class App extends Component {


  state = {
    isModalOpen:false,
    post:null,
    sortedBy:null
  }

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

   handleChangeDropdown = (e,data) => {
    this.setState({ sortedBy: data.value })
  }


   postEditAction = (post) => {
      this.setState({
        isModalOpen:true,
        post:post
      })
   }

   closeModal = () => {
      this.setState({
        isModalOpen:false,
        post:null
      })
   }

   sortByVotes = (first,second) => {
        if (first.voteScore === second.voteScore) {
          return 0
        }else if (first.voteScore > second.voteScore) {
          return -1
        }else {
          return 1
        }
   }

   sortByTimestamp = (first,second) => {
        if (first.timestamp === second.timestamp) {
          return 0
        }else if (first.timestamp > second.timestamp) {
          return -1
        }else {
          return 1
        }
   }


   handleChange = (e, data) => {

      const { categories } = this.props

      // <Link to={`/${categories[data.activeIndex].path}`}></Link>
      console.log(data)
   }


  render() {
    const { posts, categories } = this.props

    var newPosts
    switch (this.state.sortedBy) {
      case 'voteScore':
        newPosts = posts.sort(this.sortByVotes)
        break
      case 'timestamp':
        newPosts = posts.sort(this.sortByTimestamp)
        break
      default:
        newPosts = posts
    }

    var panes = []

    var newItem = { menuItem: 'All', render: () => <Tab.Pane><Post posts={newPosts} isModelOpen={this.state.isModalOpen} postEditAction={this.postEditAction}/></Tab.Pane> }
    panes.push(newItem)

    for (var i = 0; i < categories.length; i++) {
      let filteredPosts = newPosts.filter(post => post.category === categories[i].name)
      let pane = { menuItem: categories[i].name,  render: () => <Tab.Pane><Post posts={filteredPosts} isModelOpen={this.state.isModalOpen} postEditAction={this.postEditAction}/></Tab.Pane>}
      panes.push(pane)
    }

    var filterOptions = []
    let filter1 = {text:'Vote Score',value:'voteScore'}
    let filter2 = {text:'Timestamp',value:'timestamp'}
    filterOptions.push(filter1)
    filterOptions.push(filter2)

    return (
      <div className="App">

      {categories.length > 0 &&
        <div>
          <Switch>
          <Route exact path='/' render={() => (
             <div>
                <h1>Readable</h1>
                <Select placeholder='Sort by' options={filterOptions} onChange={this.handleChangeDropdown} defaultValue={this.state.sortedBy}/>
                <Tab panes={panes} onTabChange={this.handleChange} />
                <CreatePost isModalOpen={this.state.isModalOpen} closeModal={this.closeModal} currentPost={this.state.post}/>
             </div>
            )}
          />
          <Route exact path="/:category/:postId" component={this.post}/>

          <Route render={() => (
             <div>
                <Header/>
                <h1 className='Post-Detail-Top'>404 Page not found</h1>
             </div>
            )}
          />
          </Switch>
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
)(App))
