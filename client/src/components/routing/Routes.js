import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import About from '../layout/About.js';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import Logout from '../auth/Logout';
import SingleItem from '../../components/items/SingleItem';
import CreateItem from '../../components/items/CreateItem';

const Routes = () => {
    return (
        <section className='container'>
            {/* <Alert /> */}
            <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/about' component={About} />
                <Route exact path='/logout' component={Logout} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/myitems/:id' component={SingleItem} />
                <PrivateRoute exact path='/create-item' component={CreateItem} />
                { /*<Route exact path='/profiles' component={Profiles} />
                <Route exact path='/profile/:id' component={Profile} />
                <PrivateRoute exact path='/create-profile' component={CreateProfile} />
                <PrivateRoute exact path='/edit-profile' component={EditProfile} />
                <PrivateRoute exact path='/add-experience' component={AddExperience} />
                <PrivateRoute exact path='/add-education' component={AddEducation} />
                <PrivateRoute exact path='/posts' component={Posts} />
                <PrivateRoute exact path='/posts/:id' component={Post} />
                <Route component={NotFound} /> */}
            </Switch>
        </section>
    );
};

export default Routes;