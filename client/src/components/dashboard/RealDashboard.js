import React from 'react'
import PropTypes from 'prop-types'
import TransactionsByMonth from './TransactionsByMonth';

const RealDashboard = props => {
    return (
        <div>
            <TransactionsByMonth />
        </div>
    )
}

RealDashboard.propTypes = {

}

export default RealDashboard
