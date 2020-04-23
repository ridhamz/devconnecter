import React, { useState } from 'react';
import { Link, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';


const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;
    
    const onChange = ({ currentTarget: input }) => setFormData({ ...formData, [input.name]: input.value  });
    
    const onSubmit = async e => {
        e.preventDefault();
        await login(email,password);
    }

    if(isAuthenticated)
      return <Redirect to='/dashboard' />

    return ( 
        <div>
    <section>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      
      <form className="form" onSubmit={ e => onSubmit(e) }>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={ e => onChange(e) }
            name="email"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={ e => onChange(e) }
            name="password"
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
        </div>
     );
}

Login.prototype = {
  login : PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateProps = state =>({
  isAuthenticated : state.auth.isAuthenticated
})
 
export default connect(
  mapStateProps,
  { login }
  )(Login);