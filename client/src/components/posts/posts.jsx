import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layouts/spinner';
import PostItem from './postItem';
import PostForm from './postForm';



const Posts = ({ getPosts, post }) => {
    const { posts, loading } = post;
    useEffect(() => {
        getPosts()
    },[getPosts])
    return ( 
        <Fragment>
        { 
        loading ? 
        <Spinner/> 
        :
        <Fragment>
         <h1 className='large text-primary'>Posts</h1>
         <p className='lead'>
          <i className='fas fa-user' /> Welcome to the community
         </p>
         
         <PostForm />
         <div className='posts'>
          {
              posts.map(post => (
                  <PostItem key={post._post} post={post} />
              ))
          }
         </div>
        </Fragment> 
        }
        </Fragment>
     );
}

Posts.prototype={
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    post : state.post
})
 
export default connect(mapStateToProps,{ getPosts })(Posts);