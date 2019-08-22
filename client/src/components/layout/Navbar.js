import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Navbar = ({ auth: { isAuthenticated, user, loading }, logout }) => {

    const guestLinks = (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#362b01' }}>
            <div className="container">
                <Link className="navbar-brand" to="/">Gullak</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="https://github.com/mistat44/gullak" target="_blank" rel="noopener noreferrer" tabIndex="-1" aria-disabled="true">Github</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link " to="/register" tabIndex="-1" aria-disabled="true">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login" tabIndex="-1" aria-disabled="true">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );

    const authLinks = (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#362b01' }}>
            <div className="container">
                <Link className="navbar-brand" to="/">Gullak</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="https://github.com/mistat44/gullak" rel="noopener noreferrer" target="_blank" rel="noopener noreferrer" tabIndex="-1" aria-disabled="true">Github</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/logout" tabIndex="-1" aria-disabled="true">Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )

    return (
        <div>
            {!loading && (isAuthenticated ? authLinks : guestLinks)}
        </div>
    );
};


Navbar.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(
    Navbar
);