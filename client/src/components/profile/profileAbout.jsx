import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAboub = ({ profile }) => {
    const { bio, skills, user }  = profile;
    const { name } = user;
    return ( 
        <Fragment>
         <div className="profile-about bg-light p-2">
          {bio && <h2 className="text-primary">{name}'s Bio</h2>}
          { bio && <p>{ bio }</p> }
          {bio && <div className="line"></div>}

          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {
                skills.map((skill, index) => (
                    <div key={index} className='p-1'>
                    <i className='fas fa-check'> </i> {skill}
                    </div>
                ))
            }
          </div>
        </div>

        </Fragment>
     );
}

ProfileAboub.prototype = {
    profile: PropTypes.object.isRequired
}
 
export default ProfileAboub;