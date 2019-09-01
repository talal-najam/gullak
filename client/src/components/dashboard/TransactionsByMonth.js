import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getTransactions } from '../../actions/transaction';
import Spinner from '../spinner/Spinner';
import { getMonthName } from '../../utils/getMonthName';
import { getCurrencyFormat } from '../../utils/getCurrencyFormat';


const TransactionsByMonth = ({ transaction: { transactions, loading }, getTransactions }) => {

    useEffect(() => {
        getTransactions();
    }, [getTransactions])


    const getMonthlyTransactions = transactions => {
        // Get date in two digit format and Filter transactions that are created in this month
        let currentMonth = ("0" + (new Date().getMonth() + 1)).slice(-2);
        const monthlyTransactions = transactions.filter(transaction => transaction.date.substring(5, 7) == currentMonth);
        console.log(monthlyTransactions);
        // Push all the categories into a list
        let result = { Food: 0, Transport: 0, Rent: 0, Household: 0, Luxury: 0, Others: 0 }
        // Calculate and add to this month's transactions and their categories
        monthlyTransactions.forEach(transaction => {
            if (transaction.spentFor == "Food/Nutrition") result.Food += parseInt(transaction.amount);
            if (transaction.spentFor == "Transport") result.Transport += parseInt(transaction.amount);
            if (transaction.spentFor == "Household") result.Household += parseInt(transaction.amount);
            if (transaction.spentFor == "Luxury") result.Luxury += parseInt(transaction.amount);
            if (transaction.spentFor == "Utilities/Rent") result.Rent += parseInt(transaction.amount);
            if (transaction.spentFor == "Others") result.Others += parseInt(transaction.amount);
        });

        var output = [];
        for (var detail in result) {
            output.push([detail, result[detail]]);
        }

        output.sort(function (a, b) {
            return b[1] - a[1];
        });

        return output;
    }

    let mTrans = getMonthlyTransactions(transactions).slice(0, 3);

    let somemoreoutput;
    console.log('mTrans is ', mTrans)
    if (mTrans[0][1] == 0 && !loading) {
        somemoreoutput = (
            <div className="no-item-container">
                <h3>You have not made any Transactions this month &#9785;</h3>
            </div>
        )
    } else {
        somemoreoutput = loading ? (
            <div className="no-item-container">
                <Spinner />
            </div>
        ) : (
                <ul>
                    {mTrans.map((transaction, index) => (
                        <p style={{ padding: '1rem 0rem', margin: 0 }} key={transaction[0]}>{index + 1}. {transaction[0]}: RM {getCurrencyFormat(transaction[1])}</p>
                    ))
                    }
                </ul >
            )
    }

    return (
        <div>
            <div className="mt-2">
                <h3 className="text-center">Monthly Breakdown - {getMonthName()}</h3>
                <hr />
                <div style={{ padding: '1rem' }}>
                    {somemoreoutput}
                </div>
            </div>
        </div >
    )
}



TransactionsByMonth.propTypes = {
    transaction: PropTypes.object.isRequired,
    getTransactions: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    transaction: state.transaction
})

export default connect(mapStateToProps, { getTransactions })(TransactionsByMonth)
