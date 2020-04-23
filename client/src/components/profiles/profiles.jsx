import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './profileItem';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    },[getProfiles])
    return ( 
        <Fragment>
          {
              loading ?
              <Spinner /> 
              : 
              <Fragment>
              <h1 className='large text-primary'>Developers</h1>
              <p className='lead'>
               <i className='fab fa-connectdevelop'></i> Browse and connect with developers
              </p>
              <div className='profiles'>
              {
                  !profiles.length > 0 ? <h4>No Profiles Found...</h4> : (
                      profiles.map(profile => (
                          <ProfileItem key={profile._id} profile={profile} />
                      ))
                  )
              }
              </div>
              </Fragment>
          }
        </Fragment>
     );
}

Profiles.prototype = {
   getProfiles: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})
 
export default connect(mapStateToProps, { getProfiles })(Profiles);