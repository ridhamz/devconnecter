import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileTop = ({ profile }) => {
    const { status, company, location, website, social, user} = profile;
    const { name, avatar } = user;
    return ( 
        <Fragment>
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src={avatar}
            alt=""
          />
          <h1 className="large">{ name }</h1>
          <p className="lead">{status} at {company && <span>at { company }</span>}</p>
          <p>{ location && <span>{ location }</span> }</p>
          <div className="icons my-1">
           { website && (
               <a to={website} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x"></i>
            </a>
           ) }
            
          { social.twitter && 
          ( <a to={social.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            )}

           {social.facebook && 
           ( <a href={social.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            )}

           {social.linkedin && 
           ( <a to={social.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            )}

             {social.youtube && 
             (<a to={social.youtube} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube fa-2x"></i>
            </a>
            )}

            {social.instagram && 
            (<a to={social.instagram} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            )}
          </div>
        </div>
        </Fragment>
     );
}

ProfileTop.prototype = {
    profile: PropTypes.object.isRequired
}
 
export default ProfileTop;