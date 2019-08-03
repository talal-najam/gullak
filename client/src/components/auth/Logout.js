import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth';

const Alert = ({ logout, history }) => {

    useEffect(() => {
        logout();
    }, []);
    setTimeout(() => {
        history.push('/');
    }, 5000);
    return (
        <div>
            <h1 className="mt-2">Successfully Logged out!</h1>
            <p>You will be redirecting to the main page shortly...</p>
        </div>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Alert)
