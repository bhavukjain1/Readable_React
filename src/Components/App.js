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
import PageNotFound from './PageNotFound'

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

      if (data.activeIndex === 0) {
        this.props.history.push("/");
      }else {
        this.props.history.push(`/${categories[data.activeIndex - 1].name}`);
      }
   }

   getLinkFromCategory = (data) => {

    const { posts, categories } = this.props

    var categoryName = ''

    if (data.match.path == '/') {
        categoryName = 'all'
    }else {
      categoryName = data.match.params.category
    }

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


    var index = categories.map(x => x.name).indexOf(categoryName)

    if (categoryName == 'all') {
      index = 0
    }
    if (index == -1) {

        return (
            <PageNotFound/>
          )

    }else {

    if (categoryName == 'all') {
      index = -1
    }

      return (
         <div>
            <h1>Readable</h1>
            <Select placeholder='Sort by' options={filterOptions} onChange={this.handleChangeDropdown} defaultValue={this.state.sortedBy}/>
            <Tab panes={panes} onTabChange={this.handleChange} activeIndex={index+1}/>
            <CreatePost isModalOpen={this.state.isModalOpen} closeModal={this.closeModal} currentPost={this.state.post}/>
         </div>
        )
    }
   }

  render() {

    const { categories } = this.props

    return (
      <div className="App">

      {categories.length > 0 &&
        <div>
          <Switch>
            <Route path="/:category/:postId" component={this.post}/>
            <Route exact path='/:category' component={this.getLinkFromCategory} />
            <Route exact path='/' component={this.getLinkFromCategory} />
            <Route component={PageNotFound}/>
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
