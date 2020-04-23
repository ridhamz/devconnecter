import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostById } from '../../actions/post';
import Spinner from '../layouts/spinner';
import PostItem from '../posts/postItem';
const Post = ({ getPostById, post: { post, loading }, match }) => {
  useEffect(()=>{
      getPostById(match.params.id)
  },[getPostById])
  return ( 
        <Fragment>
         {
             loading || post === null ? <Spinner /> : 
             (<Fragment>
             <PostItem post={post} showActions={false} />
             </Fragment>)
         }
        </Fragment>
     );
}

Post.prototype = {
    getPostById: PropTypes.func.isRequired,
    //post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})
 
export default connect(mapStateToProps, { getPostById })(Post);