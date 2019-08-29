import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addTransaction } from '../../actions/transaction';

// Todo add a CreateTransaction functionality and connect it with Redux 

const TransactionForm = ({ addTransaction }) => {

    const [formData, setFormData] = useState({
        amount: '5',
        category: 'Daily Expense',
        spentFor: 'Food/Nutrition'
    });

    const { amount, category, spentFor } = formData;

    const onChange = e => {
        return setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        console.log(formData);
        addTransaction(amount, category, spentFor);
    }


    return (
        <div className="row">
            <div className="col-lg-10 mx-auto item-background ">
                <div className="mt-3">
                    <h3 className='large text-center'>Enter Transaction</h3>
                    <hr />

                    <form className='form' onSubmit={e => onSubmit(e)}>
                        <div className='form-group row'>
                            <div className="col-lg-2 c-form-label"  >
                                <label>Amount:</label>
                            </div>
                            <div className="col-lg-10">
                                <input
                                    className="form-control"
                                    type='number'
                                    placeholder='Enter the Transaction amount...'
                                    name='amount'
                                    value={amount}
                                    onChange={e => onChange(e)}
                                />
                            </div>
                        </div>
                        <div className='form-group row'>
                            <div className="col-lg-2 c-form-label">
                                <label>Category:</label>
                            </div>
                            <div className="col-lg-10">
                                <select className="form-control" name="category" value={category} onChange={e => onChange(e)}>
                                    <option value="Daily Expense">Daily Expense</option>
                                    <option value="Lent/Borrowed">Lent/Borrowed</option>
                                    <option value="Lost">Lost</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>
                        <div className='form-group row'>
                            <div className="col-lg-2 c-form-label">
                                <label>Details:</label>
                            </div>
                            <div className="col-lg-10">
                                <select className="form-control" name="spentFor" value={spentFor} onChange={e => onChange(e)}>
                                    <option value="Food/Nutrition">Food/Nutrition</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Household">Household</option>
                                    <option value="Luxury">Luxury</option>
                                    <option value="Utilities/Rent">Utilities/Rental</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-center">
                            <input type='submit' className='mybuttons btn btn-primary' value='Add'
                                style={{ backgroundColor: '#362b01', border: 'none', borderRadius: '0', width: '8rem' }}
                            />
                        </div>
                    </form>
                    <hr />
                </div>
            </div>
        </div>
    )
}

TransactionForm.propTypes = {

}

export default connect(null, { addTransaction })(TransactionForm);
