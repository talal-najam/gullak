import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import imageOne from './images/imageOne.PNG';
import imageTwo from './images/imageTwo.PNG';
import imageThree from './images/imageThree.PNG';
import imageFour from './images/imageFour.PNG';

const Landing = ({ isAuthenticated }) => {

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <div >
            <div className="jumbotron">
                <div className="container" style={{ color: '#362b01' }}>
                    <h1 className="display-4 text-center" id="landing-title">Gullak!</h1>
                    <p className="lead text-center">Your Ultimate Expense Tracker And Financial Goal Setting Tool</p>
                    <hr className="my-4" />
                    <p className="text-center" >Track Expenses and Budget. Achieve Financial Goals. All In One Place.</p>
                    <p className="lead text-center">
                        <Link className="mybuttons btn btn-primary btn-lg mt-4" style={{ backgroundColor: '#362b01', border: 'none', borderRadius: '0', width: '8rem' }} to="/register" role="button">
                            Register
                    </Link>
                        <Link className="mybuttons btn btn-primary btn-lg mt-4 ml-4" style={{ backgroundColor: '#362b01', border: 'none', borderRadius: '0', width: '8rem' }} to="/login" role="button">
                            Login
                    </Link>
                    </p>
                </div>
            </div>
            <div className="animation-section">
                <div className="container">
                    <section className="custom-card">
                        <img src={imageOne} alt="" />
                        <div >
                            <h3>Track Your Expenses</h3>
                            <p>Using the built in Transaction History feature, you can add, delete, and manage your transactions to keep track of your expenses and ensure you are utilizing your budget wisely.</p>
                        </div>
                    </section>
                    <section className="custom-card" data-aos="fade-left">
                        <img src={imageTwo} alt="" />
                        <div >
                            <h3>Set 'em Goals, Achieve 'em Goals</h3>
                            <p>Set your Goals with a click of a button and Always keep an eye on the prize to make sure you stay focused and do not get distracted. With the Interactive dashboard, Your recently created Items will always be in your sight.</p>
                        </div>
                    </section>
                    <section className="custom-card" data-aos="fade-right">
                        <img src={imageThree} alt="" />
                        <div>
                            <h3>Dig Deep And Analyze!</h3>
                            <p>The Interactive Dashboard consists of Visualized Data of your spendings so you can easily monitor your money. You're a Visual Person? Use the graph to monitor your spendings on the go!</p>
                        </div>
                    </section>
                    <section className="custom-card" data-aos="fade-left">
                        <img src={imageFour} alt="" />
                        <div >
                            <h3>Items, Transactions, Insights And Much More...</h3>
                            <p>Easily Manage and Monitor your Financial Goals and Expenses without losing focus, combined with a Nice and Easy-to-use Interface - What Are You Waiting For? </p>
                        </div>
                    </section>
                </div>
            </div>

        </div>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);