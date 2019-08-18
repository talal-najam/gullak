import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getItem } from '../../actions/item'
import { Link } from 'react-router-dom'

const SingleItem = ({ getItem, item: { loading, item }, match }) => {

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
        output = loading ? (<h1>Loading...</h1>) : <h3>No Item Found on this Link :(</h3>
    } else {
        output = loading ? (<h1>Loading...</h1>) : (
            <div className="row">
                <div className="col-lg-10 mx-auto item-background ">
                    <div className="mt-3">
                        <h1 className='large text-center'>{item.name}</h1>
                        <hr />

                        <div className="row">

                            {/* First Column */}
                            <div className="col-lg-5 col-md-4 col-sm-12 mx-auto">
                                <h3 className="text-centre">Item details</h3>
                                <p>Name: {item.name}</p>
                                <p>Price: RM {item.price}</p>
                                <p>Date Added: {item.date}</p>
                            </div>

                            {/* Second Column */}
                            <div className="col-lg-5 mx-auto col-md-4 mx-auto col-sm-12 ">
                                <h3 className="text-centre">Financial details</h3>
                                <p>Current Savings: {item.savings}</p>
                                <p>Goal Achieved?: {item.goalAchieved ? (<span>Yes</span>) : (<span>No</span>)}</p>
                                <p>Product page: <a target="_blank" href={item.url}>{item.name}</a></p>
                            </div>

                            <hr />


                            <div className="col-lg-5 col-md-4 mx-auto col-sm-12">

                                <div className='form-group mt-3'>
                                    <input
                                        className="form-control"
                                        type='text'
                                        placeholder='Add to savings'
                                        name='savings'
                                        value={amount}
                                        onChange={e => onChange(e)}
                                    />
                                    <div className="text-center mt-3">
                                        <button onClick={() => { }} className='mybuttons btn btn-primary '
                                            style={{ backgroundColor: '#362b01', border: 'none', borderRadius: '0', width: '8rem' }}
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

export default connect(mapStateToProps, { getItem })(SingleItem)

