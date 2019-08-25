import React from 'react'
import PropTypes from 'prop-types'
import TransactionForm from './TransactionForm';

const Transactions = props => {
    return (
        <div>
            <div className="row">
                <div className="col-lg-6 col-sm-12">
                    <div className="transaction-background">
                        <TransactionForm />
                    </div>
                </div>
                <div className="col-lg-6 col-sm-12">
                    World
                </div>
            </div>
        </div>
    )
}

Transactions.propTypes = {

}

export default Transactions
