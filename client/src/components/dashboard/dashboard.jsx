import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/spinner';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Actions from './actions';
import Experience from './experience';
import Edication from './education';


const Dashboard = ({ 
    getCurrentProfile, 
    auth: { user }, profile: { profile, loading },
    deleteAccount 
    }) => {
    useEffect(()=>{
        getCurrentProfile();
    },[getCurrentProfile])

    return loading && profile === null ? <Spinner /> : <Fragment>
       <h1 className='large text-primary'>Dhashboard</h1>
       <p className='lead'>
         <i className='fas fa-user'></i> Welcome { user && user.name }
       </p>
       {
           profile !== null ?
           <Fragment>
            <Actions />
            <Experience experience={profile.experience} />
            <Edication education={profile.education} />
            <div className='my-2'>
            <button className='btn btn-danger' onClick={ () => deleteAccount() }>
              <i className='fas fa-user-monus'></i> Delete My Account
            </button>
            </div>
           </Fragment> 
           :
            <Fragment>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to='/create-profile' className='btn btn-primary m-1'>
               Create Profile
              </Link>
            </Fragment>
       }
    </Fragment>
}

Dashboard.prototype = {
    getCurrentProfile: PropTypes.func,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});
 
export default 
connect(
    mapStateToProps,{ getCurrentProfile, deleteAccount }
    )(Dashboard);