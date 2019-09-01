import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTransactions, deleteTransaction } from '../../actions/transaction';
import Moment from 'react-moment';
import Spinner from '../spinner/Spinner';
import Pagination from './Pagination';

const TransactionHistory = ({ getTransactions, deleteTransaction, transaction: { loading, transactions } }) => {

    useEffect(() => {
        getTransactions();
    }, [getTransactions]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    console.log('trans is ', transactions)

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = transactions.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);



    let output;
    let transactionsTable;

    output = (transactions.map(transaction => <h1>{transaction.amount}</h1>))
    if (transactions.length > 0 && !loading) {
        transactionsTable = (currentPosts.map((transaction, index) => (
            <tr key={index}>
                {/* <th scope="row">{index + 1}</th> */}
                <td>RM {transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.spentFor}</td>
                <td><Moment format="DD/MM/YY" date={transaction.date} /></td>
                <td><button className="btn btn-danger btn-sm" onClick={() => { deleteTransaction(transaction._id) }}>&#10005;</button></td>
            </tr>
        )));
        output = loading ? (<div className="something">
            <Spinner />
        </div>) : (
                <table className="table table-striped ">
                    <thead>
                        <tr>
                            {/* <th scope="col">#</th> */}
                            <th scope="col">Amount</th>
                            <th scope="col">Category</th>
                            <th scope="col">Details</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionsTable}
                    </tbody>
                </table>
            )
    } else {
        output = loading ? (
            <div className="something">
                <Spinner />
            </div>
        ) : (
                <div className="something">
                    <h3 className="text-center">No Recorded Transactions &#9785;</h3 >
                </div>
            )
    }


    return (
        <div>
            <div className="mt-3" id="cookies">
                <h3 className='text-center'>Transaction History</h3>
            </div>
            <hr />
            {output}
            <div className="pagination-container">
                <Pagination postsPerPage={postsPerPage} totalPosts={transactions.length} paginate={paginate} />
            </div>
        </div>
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
