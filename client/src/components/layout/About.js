import React from 'react';

const Landing = () => {

    return (
        <div className="about-heading">
            <h1>Gullak</h1>
            <hr />
            <h5 className="app-content">Overview</h5>
            <p className="about-content"><b>Gullak</b> - is an Expense Tracking and Financial Goal Setting application. Have you ever checked your account at the end of the money and ever wondered where you might be spending the most? Is it the new phone you are looking to buy but cannot save up for. Well Gullak is just the right platform to track and record your expenses and eventually, look at the trends of your spending habits. </p>
            <h5 className="app-content">Why should I use Gullak?</h5>
            <p className="about-content">If you are a student, professional or any individual for that matter, spending money recklessly and noticing it very late is something we all encounter at one point of our lives. This is the part where <b>Gullak</b> comes in to play, Gullak allows you to track all your information in one platform, while providing you the insides you need to make informed, smarted decisions. Moreover, all your data is confidential and only accessible to you. Following are some of the key features of using this application</p>
            <h5 className="app-content">Features:</h5>
            <ul className="app-feature-list about-content">
                <li>Dashboard provides all the information you need to look at in one place. This includes your spending of the day/month/year, Transaction History,your current goals and the best part - a graph showing your spending habits</li>
                <li>Items allows you to create a wish list of items and set your goals that you can contribute to</li>
                <li>Breakdown shows the different categories of spendings for the selected time period e.g. monthly, yearly etc.</li>
                <li>Transaction History is used to track and record all your spendings</li>
            </ul>
        </div>
    );
};

export default Landing;