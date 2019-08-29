import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getItems } from '../../actions/item';
import { getTransactions } from '../../actions/transaction';


const TransactionsByMonth = ({ item: { items }, transaction: { transactions }, getItems, getTransactions }) => {

    useEffect(() => {
        getItems();
        getTransactions();
    }, [getItems, getTransactions])


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

    const itemList = items.map(item => (<li key={item._id}>{item.name}</li>))
    let mTrans = getMonthlyTransactions(transactions).slice(0, 3);
    let somemoreoutput = mTrans.map(transaction => (<p>{transaction[0]}: {transaction[1]}</p>))

    return (
        <div>
            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12">
                    <h2>Money spent on categories</h2>
                    <ul>
                        {itemList}
                    </ul>
                </div>
                <hr />
                <div className="col-lg-6 col-md-12 col-sm-12">
                    <h2>Top 3 categories for this month</h2>
                    <ul>
                        {somemoreoutput}
                    </ul>
                </div>
            </div>

        </div>
    )
}



TransactionsByMonth.propTypes = {
    item: PropTypes.object.isRequired,
    getItems: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    item: state.item,
    transaction: state.transaction
})

export default connect(mapStateToProps, { getItems, getTransactions })(TransactionsByMonth)
