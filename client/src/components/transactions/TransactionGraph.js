import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2'


const TransactionGraph = ({ transaction: { transactions } }) => {
    const [chartData, setChartData] = useState({

    });

    let result = { Food: 0, Transport: 0, Rent: 0, Household: 0, Luxury: 0, Others: 0 }
    // Calculate and add to this month's transactions and their categories
    transactions.forEach(transaction => {
        if (transaction.spentFor == "Food/Nutrition") result.Food += parseInt(transaction.amount);
        if (transaction.spentFor == "Transport") result.Transport += parseInt(transaction.amount);
        if (transaction.spentFor == "Household") result.Household += parseInt(transaction.amount);
        if (transaction.spentFor == "Luxury") result.Luxury += parseInt(transaction.amount);
        if (transaction.spentFor == "Utilities/Rent") result.Rent += parseInt(transaction.amount);
        if (transaction.spentFor == "Others") result.Others += parseInt(transaction.amount);
    });

    let data = {
        labels: ['Food', 'Transport', 'Rent', 'Household', 'Luxury', 'Others'],
        datasets: [
            {
                label: 'Expense Details',
                data: Object.values(result),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 23, 192, 0.6)',
                    'rgba(163, 102, 255, 0.6)',
                    'rgba(213, 52, 55, 0.6)',

                ]
            }
        ]
    }

    console.log("CHART DATA REMODIFIED", chartData)



    console.log("RESULT", result)

    const chart = (
        <Bar
            data={data}
            options={{
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0,
                        }
                    }]
                }
            }}
            height={200}
        />
    )

    return (
        <div >
            <div className="mt-3" id="cookies">
                <h3 className='large text-center'>Expense Tracker</h3>
            </div>
            <hr />
            <div className="mt-3">
                {chart}
            </div>
        </div>
    )
}

TransactionGraph.propTypes = {
    transaction: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    transaction: state.transaction
})


export default connect(mapStateToProps, {})(TransactionGraph)
