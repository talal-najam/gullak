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
        <div className="jumbotron">
            <div className="container" style={{ color: '#362b01' }}>
                <h1 className="display-4 text-center">Gullak!</h1>
                <p className="lead text-center">Your Ultimate Personal Finance And Financial Goal Setting Tool</p>
                <hr className="my-4" />
                <p className="text-center" >Set Financial Goals. Achieve Them. Fulfill Your Life With Happiness.</p>
                <p className="lead text-center">
                    <Link className="mybuttons btn btn-primary btn-lg mt-4" style={{ backgroundColor: '#362b01', border: 'none', borderRadius: '0', width: '10rem' }} to="/register" role="button">
                        Join Today!
                    </Link>
                </p>
            </div>
        </div>
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