import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../../actions/auth';

const Alert = ({ logout }) => {

    useEffect(() => {
        logout();
    }, []);
    // Removed delayed Logout message. Turned it into an instant logout function.
    // setTimeout(() => {
    //     history.push('/');
    // }, 5000);
    return (
        <Redirect to="/" />
        // <div>
        //     <h1 className="mt-2">Successfully Logged out!</h1>
        //     <p>You will be redirecting to the main page shortly...</p>
        // </div>
    );
}

logout.propTypes = {
    logout: PropTypes.func.isRequired,
}


export default connect(null, { logout })(Alert)
