import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Item from '../items/Item'
import { getItems } from '../../actions/item';
import { setAlert } from '../../actions/alert';
import Spinner from '../spinner/Spinner';

const Dashboard = ({ getItems, item: { loading, items } }) => {
    let output;
    let listItems;

    useEffect(() => {
        getItems();
    }, [getItems]);


    if (items.length > 0 && !loading) {
        listItems = (items.map(item => <Item key={item._id} savings={item.savings} id={item._id} name={item.name} price={item.price} url={item.url} goalAchieved={item.goalAchieved} goalPercentage={item.goalPercentage} date={item.date} />));
        output = loading ? (<h1>Loading...</h1>) : (
            <div>
                <Link to="/create-item" className="btn btn-primary mt-3" id="create-button">Create Item</Link>
                <hr />
                <div className="items">
                    {listItems}
                </div>
            </div>
        )
    } else {
        output = loading ? (<Spinner />) : (
            <div className="something">
                <div className="text-center">
                    <h3>Your Item list is empty &#9785;   <Link to="/create-item" className="btn btn-primary btn-sm ml-3" id="create-button">Create an Item</Link></h3 >
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

Dashboard.propTypes = {
    item: PropTypes.object.isRequired,
    getItems: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    item: state.item
})

export default connect(mapStateToProps, { getItems })(
    Dashboard
);

