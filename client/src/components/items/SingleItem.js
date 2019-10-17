import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getItem, addSaving } from '../../actions/item'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { getCurrencyFormat } from '../../utils/getCurrencyFormat';
import Spinner from '../spinner/Spinner';

const SingleItem = ({ getItem, addSaving, item: { loading, item }, match, history }) => {

    const [savings, addSavings] = useState({
        amount: ""
    });

    const { amount } = savings;

    const onChange = e => {
        return addSavings({ ...savings, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        getItem(match.params.id);
    }, [getItem]);


    let output;


    if (item == null) {
        output = loading ? (<div className="something">
            <Spinner />
        </div>) : <h3>No Item Found on this Link &#9785;</h3>
    } else {
        output = loading ? (<div className="something">
            <Spinner />
        </div>) : (
                <div className="row">
                    <div className="col-lg-10 mx-auto item-background ">
                        <div className="mt-3">
                            <h1 className='large text-center'>{item.name}</h1>
                            <hr />

                            <div className="row">

                                {/* First Column */}
                                <div className="col-lg-5 col-sm-12 mx-auto">
                                    <h3 className="text-centre">Item details</h3>
                                    <p>Name: {item.name}</p>
                                    <p>Price: RM {getCurrencyFormat(item.price)}</p>
                                    <p>Date Added: <Moment format="DD/MM/YY">{item.date}</Moment></p>
                                </div>

                                {/* Second Column */}
                                <div className="col-lg-5 col-sm-12 mx-auto">
                                    <h3 className="text-centre">Financial details</h3>
                                    <p>Current Savings: {getCurrencyFormat(item.savings)}</p>
                                    <p>Goal Achieved?: {parseFloat(item.savings) > parseFloat(item.price) ? (<span>Yes</span>) : (<span>No</span>)}</p>
                                    {/* <p>Goal Achieved?: {item.goalAchieved ? (<span>Yes</span>) : (<span>No</span>)}</p> */}
                                    <p>Product page: <a target="_blank" href={item.url}>{item.name}</a></p>
                                </div>

                                <hr />


                                <div className="col-lg-5 col-md-4 mx-auto col-sm-10">

                                    <div className='form-group mt-3'>
                                        <input
                                            className="form-control"
                                            type='text'
                                            placeholder='Add to savings'
                                            name='amount'
                                            value={amount}
                                            onChange={e => onChange(e)}
                                            required="true"
                                        />
                                        <div className="text-center mt-3">
                                            <button onClick={() => { addSaving(item._id, amount, history) }} className='mybuttons btn btn-primary '
                                            >Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            )
    }

    return (
        <div>
            {output}
        </div>
    )
}

SingleItem.propTypes = {
    item: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    item: state.item
})

export default connect(mapStateToProps, { getItem, addSaving })(SingleItem)

