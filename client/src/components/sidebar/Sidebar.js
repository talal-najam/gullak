import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';


const Sidebar = ({ auth: { isAuthenticated, loading } }) => {

    const guestSidebar = (
        <div className="sidebar-wrapper">
            <div className="sidebar-branding-container">
                <Link className="sidebar-branding" to="/">Gullak</Link>
            </div>
            <div className="sidebar-items">
                <ul className="sidebar-items-list">
                    <li className="sidebar-item">
                        <Link className="sidebar-nav" to="/about">
                            About
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <a className="sidebar-nav" href="https://github.com/mistat44/gullak" rel="noopener noreferrer" target="_blank" rel="noopener noreferrer" tabIndex="-1" aria-disabled="true">
                            Github
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );

    const authSidebar = (
        <div className="sidebar-wrapper">
            <div className="sidebar-branding-container">
                <Link className="sidebar-branding" to="/">Gullak</Link>
            </div>
            <div className="sidebar-items">
                <ul className="sidebar-items-list">
                    <li className="sidebar-item">
                        <Link className="sidebar-nav" to="/">
                            Dashboard
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link className="sidebar-nav" to="/items">
                            Items
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link className="sidebar-nav" to="/transactions">
                            Transactions
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link className="sidebar-nav" to="/about">
                            About
                        </Link>

                    </li>
                    <li className="sidebar-item">
                        <a className="sidebar-nav" href="https://github.com/mistat44/gullak" rel="noopener noreferrer" target="_blank" rel="noopener noreferrer" tabIndex="-1" aria-disabled="true">
                            Github
                        </a>
                    </li>
                </ul >
            </div >
        </div >
    );

return (
    <Fragment>
        {isAuthenticated ? (authSidebar) : (guestSidebar)}
    </Fragment>
)
}

Sidebar.propTypes = {
    auth: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Sidebar);