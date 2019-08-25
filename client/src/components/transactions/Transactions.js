import React from 'react'
import PropTypes from 'prop-types'
import TransactionForm from './TransactionForm';
import TransactionHistory from './TransactionHistory';

const Transactions = props => {
    return (
        <div className="">
            <div className="row">
                <div className="col-lg-6 col-sm-12">
                    <div className="transaction transaction-background">
                        <TransactionForm />
                    </div>
                </div>
                <div className="col-lg-6 col-sm-12">
                    <div className="transaction ">
                        <TransactionHistory />
                    </div>
                </div>
            </div>
        </div>
    )
}

Transactions.propTypes = {

}

export default Transactions
