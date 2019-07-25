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
        <div class="jumbotron">
            <div className="container" style={{ color: '#362b01' }}>
                <h1 class="display-4 text-center">Gullak!</h1>
                <p class="lead text-center">Your Ultimate Personal Finance And Goal Setting Tool.</p>
                <hr class="my-4" />
                <p className="text-center" >Set Goals. Achieve Them. Fulfill Yourself With Happiness.</p>
                <p class="lead text-center">
                    <a class="btn btn-primary btn-lg mt-4" style={{ backgroundColor: '#362b01', border: 'none', borderRadius: '0', width: '15rem' }} href="#" role="button">Learn more</a>
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