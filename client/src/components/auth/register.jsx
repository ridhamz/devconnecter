import React, { useState } from 'react';
import { Link, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';


const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;
    
    const onChange = ({ currentTarget: input }) => setFormData({ ...formData, [input.name]: input.value  });
    
    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2) 
          return setAlert('password not much','danger');
        await register({ name, email, password })
    }
    
    if(isAuthenticated)
      return <Redirect to='/dashboard' />
    return ( 
    <div>
    <section>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
     
      <form className="form" onSubmit={ e => onSubmit(e)}>

        <div className="form-group">
          <input 
             type="text" 
             placeholder="Name" 
             name="name" 
             value={name}
             onChange={ e => onChange(e) }
             required 
             />
        </div>

        <div className="form-group">
          <input 
             type="email" 
             placeholder="Email Address" 
             onChange={ e => onChange(e) }
             name="email" 
             value={email}
             required
             />

          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>

        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            onChange={ e => onChange(e) }
            name="password"
            minLength="6"
            value={password}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={ e => onChange(e) }
            name="password2"
            minLength="6"
            value={password2}
            required
          />
        </div>

        <input 
           type="submit" 
           className="btn btn-primary" 
           value="Register" 
           />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
        </div>
     );
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateProps = state =>({
  isAuthenticated : state.auth.isAuthenticated
})
 
export default connect(mapStateProps, { 
  setAlert,
  register
  })(Register);