import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/spinner';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './profileTop';
import ProfileAbout from './profileAbout';
import ProfileExperience from './profileExperience';
import ProfileEducation from './profileEducation';
import ProfileGithub from './profileGithub';

const Profile = ({
     getProfileById,
    profile: {profile, loading },
    match, 
    auth
 }) => {
    useEffect(()=>{
        getProfileById(match.params.id);
    },[getProfileById, match.params.id])
    return ( 
        <Fragment>
          { profile === null || loading ? <Spinner /> : 
          <Fragment>
            <Link to='/profiles' className='btn btn-primary'>
             Go Back
            </Link>
            {
              auth.isAuthenticated   && 
              auth.loading === false && 
              auth.user._id === profile.user._id &&
              (<Link to='/edit-profile' className='btn btn-dark'>Edit profile</Link>)
            }

            <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
        

           <div class="profile-exp bg-white p-2">
           <h2 class="text-primary">Experience</h2>
            { profile.experience.length > 0 ? 
            (
                <Fragment>
                {profile.experience.map(exp => (
                    <ProfileExperience key={exp._id} experience={exp} />
                ))}
                </Fragment>
                ) : (
                <h4>No Experience Credentials</h4>
            ) }
          </div>
          <div class="profile-edu bg-white p-2">
          <h2 class="text-primary">Education</h2>
          { profile.education.length > 0 ? 
            (
                <Fragment>
                {profile.education.map(edu => (
                    <ProfileEducation key={edu._id} education={edu} />
                ))}
                </Fragment>
                ) : (
                <h4>No Education Credentials</h4>
            ) }
          </div>
          </div>
          {
              profile.githubusername && (
                  <ProfileGithub 
                    username={profile.githubusername} 
                   />
              )
          }
          </Fragment>
           }
        </Fragment>
     );
}

Profile.prototype = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})
 
export default connect(mapStateToProps, { getProfileById })(Profile);