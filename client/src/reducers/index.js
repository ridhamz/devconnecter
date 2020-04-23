import { combineReducers } from 'redux';
import Alert from './alert';
import auth from './auth'
import profile from './profile'
import post from './post';

export default  combineReducers({
    alert:Alert,
    auth,
    profile,
    post
    })