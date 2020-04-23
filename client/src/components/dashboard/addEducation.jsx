import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation,  history }) => {

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

     const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})
    
    const onSubmit = async e => {
        e.preventDefault();
        await addEducation(formData,history);
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = formData;
    const [toDateDisabled, toggleDisabled] = useState(false);
    return ( 
        <Fragment>
          <h1 className="large text-primary">
       Add An Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school/bootcamp
         that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={ e => onSubmit(e) }>
        <div className="form-group">
          <input type="text" 
                placeholder="* School or Bootcamp" 
                value={school}
                onChange={ e => onChange(e) }
                name="school" required />
        </div>
        <div className="form-group">
          <input type="text" 
                 placeholder="* Degree" 
                 value={degree}
                 onChange={ e => onChange(e) }
                 name="degree" required />
        </div>
        <div className="form-group">
          <input type="text" 
                placeholder="Field Of Study"
                value={fieldofstudy}
                onChange={ e => onChange(e) }
                name="fieldofstudy" />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" 
                 name="from" 
                 value={from}
                 onChange={ e => onChange(e) }
                 />
        </div>
         <div className="form-group">
          <p><input type="checkbox" 
                    value={current}
                    onChange={ e => {
                        setFormData({ ...formData, current: !current });
                        toggleDisabled(!toDateDisabled);
                    }  }
                    name="current" checked={current}
                    />{' '} Current School</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" 
                 name="to" 
                 value={to}
                onChange={ e => onChange(e) }
                disabled={toDateDisabled ? 'disabled' : ''}
                 />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            value={description}
            onChange={ e => onChange(e) }
            placeholder="Education Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
        </Fragment>
     );
}

AddEducation.prototype = {
    addEducation: PropTypes.func.isRequired
}
 
export default connect(null,{ addEducation })(withRouter(AddEducation));