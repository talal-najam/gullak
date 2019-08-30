import React from 'react'
import PropTypes from 'prop-types'
import TransactionsByMonth from './TransactionsByMonth';
import TopItems from './TopItems.js';
import TransactionHistory from '../transactions/TransactionHistory'
import TransactionGraph from '../transactions/TransactionGraph.js';

const RealDashboard = props => {
    return (
        <div>
            <div className="row" >
                <div className="col-lg-6 col-md-6 col-sm-12 pt-4">
                    <TopItems />
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 pt-4">
                    <TransactionsByMonth />
                </div>
            </div>

            <div className="row" >

                <div className="col-lg-6 col-md-6 col-sm-12">
                    <TransactionGraph />
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12">
                    <TransactionHistory />
                </div>
            </div>
        </div>
    )
}

RealDashboard.propTypes = {

}

export default RealDashboard
