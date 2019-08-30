import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getItems } from '../../actions/item';
import { getTransactions } from '../../actions/transaction';


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

    if (mTrans[0][1] == 0 && !loading) {
        somemoreoutput = (<h3>Stingy little nigga</h3>)
    } else {
        somemoreoutput = mTrans.map((transaction, index) => (<p style={{ padding: '0.3rem' }} key={transaction[0]}>{index + 1}. {transaction[0]}: {transaction[1]}</p>))
    }

    return (
        <div>
            <div className="mt-2">
                <h3>Top 3 Monthly Breakdown</h3>
                <hr />
                <div style={{ padding: '1rem' }}>
                    <ul >
                        {somemoreoutput}
                    </ul>
                </div>
            </div>
        </div>
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
