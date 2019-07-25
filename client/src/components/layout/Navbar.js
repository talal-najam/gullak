import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { logout } from '../../actions/auth';

// const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
const Navbar = () => {

    // const authLinks = (
    // <ul>
    //     <li>
    //         <Link to='/profiles'>Developers</Link>
    //     </li>
    //     <li>
    //         <Link to='/posts'>Posts</Link>
    //     </li>
    //     <li>
    //         <Link to='/dashboard'>
    //             <i className='fas fa-user' />{' '}
    //             <span className='hide-sm'>Dashboard</span>
    //         </Link>
    //     </li>
    //     <li>
    //         <a onClick={logout} href='#!'>
    //             <i className='fas fa-sign-out-alt' />{' '}
    //             <span className='hide-sm'>Logout</span>
    //         </a>
    //     </li>
    // </ul>
    // );

    const guestLinks = (
        <ul className="navbar-nav"  >
            <li className="nav-item">
                <Link className="nav-link" to='/profiles'>Developers</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/register'>Register</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/login'>Login</Link>
            </li>
        </ul>
    );

    return (
        <nav class="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#362b01' }}>
            <div className="container">
                <Link class="navbar-brand" to="/">Gullak</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/about">About</Link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="https://github.com/" target="_blank" tabindex="-1" aria-disabled="true">Github</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link " to="/register" tabindex="-1" aria-disabled="true">Register</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/login" tabindex="-1" aria-disabled="true">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

export default Navbar;