import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTransactions, deleteTransaction } from '../../actions/transaction';

const TransactionHistory = ({ getTransactions, deleteTransaction, transaction: { loading, transactions } }) => {

    useEffect(() => {
        getTransactions();
    }, [getTransactions]);

    console.log('Grabbing transactions array from state', transactions)
    console.log('Grabbing loading from state', loading)

    let output;
    let transactionsTable;

    output = (transactions.map(transaction => <h1>{transaction.amount}</h1>))
    if (transactions.length > 0) {
        transactionsTable = (transactions.map((transaction, index) => (
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.spentFor}</td>
                <td><button className="btn btn-danger btn-sm" onClick={() => { deleteTransaction(transaction._id) }}>&#10005;</button></td>
            </tr>
        )));
        output = loading ? (<h1>Loading...</h1>) : (
            <div>
                <div className="mt-3" id="cookies">
                    <h3 className='large text-center'>Transaction History</h3>
                </div>
                <hr />
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Category</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionsTable}
                    </tbody>
                </table>
            </div>
        )
    } else {
        output = loading ? (<h1>Loading...</h1>) : (<h3 className="text-center mt-3 pt-3">No Recorded Transactions :(</h3 >)
    }


    return (
        <div>
            {output}
        </div>

        // <div>
        //     <div className="mt-3" id="cookies">
        //         <h3 className='large text-center'>Transaction History</h3>
        //     </div>
        //     <hr />
        //     <table className="table table-striped table-dark">
        //         <thead>
        //             <tr>
        //                 <th scope="col">#</th>
        //                 <th scope="col">Amount</th>
        //                 <th scope="col">Category</th>
        //                 <th scope="col">Details</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             <tr>
        //                 <th scope="row">1</th>
        //                 <td>Mark</td>
        //                 <td>Otto</td>
        //                 <td>@mdo</td>
        //             </tr>
        //             <tr>
        //                 <th scope="row">2</th>
        //                 <td>Jacob</td>
        //                 <td>Thornton</td>
        //                 <td>@fat</td>
        //             </tr>
        //             <tr>
        //                 <th scope="row">3</th>
        //                 <td>Larry</td>
        //                 <td>the Bird</td>
        //                 <td>@twitter</td>
        //             </tr>
        //         </tbody>
        //     </table>
        // </div>
    )
}

TransactionHistory.propTypes = {
    transaction: PropTypes.object.isRequired,
    getTransactions: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    transaction: state.transaction
})

export default connect(mapStateToProps, { getTransactions, deleteTransaction })(TransactionHistory);
