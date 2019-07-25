import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// const Landing = ({ isAuthenticated }) => {
const Landing = () => {

    // if (isAuthenticated) {
    //     return <Redirect to='/dashboard' />;
    // }

    return (
        <h1>Nigga! Did you really just click About on a dev server?</h1>
    );
};

// Landing.propTypes = {
//   isAuthenticated: PropTypes.bool
// };

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// });

// export default connect(mapStateToProps)(Landing);
export default Landing;