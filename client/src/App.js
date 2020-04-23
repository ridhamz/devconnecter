import React, { useEffect, Profiler } from 'react';
import Navbar from './components/layouts/navbar';
import Landing from './components/layouts/landing';
import Login from './components/auth/login';
import Register from './components/auth/register';
import { Route, Switch } from 'react-router-dom';
import Alert from './components/layouts/alert';
import setAuthToken from './utils/setAuthToken';

//Redux
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/dashboard';
import PrivateRoute from './components/routing/privateRoute';
import CreateProfile from './components/dashboard/createProfile';
import EditProfile from './components/dashboard/editProfile';
import AddExperience from './components/dashboard/addExperience';
import AddEducation from './components/dashboard/addEducation';
import Profiles from './components/profiles/profiles';
import Profile from './components/profile/profile';
import Posts from './components/posts/posts';
import Post from './components/post/post';


if(localStorage.token)
     setAuthToken(localStorage.token);
const  App = () => {

  useEffect(()=>{
    store.dispatch(loadUser());
  },[])
  
  return (
    <Provider store={store}>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <section className='container'>
       <Alert />
       <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/profiles'  component={Profiles} />
        <Route exact path='/profile/:id'  component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/posts' component={Posts} />
         <PrivateRoute exact path='/post/:id' component={Post} />       
       </Switch> 
      </section>
    </Provider>
  );
}

export default App;
