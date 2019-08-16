import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Item from '../items/Item'
import { getItems } from '../../actions/item';

const Dashboard = ({ getItems, item: { loading, items } }) => {


    useEffect(() => {
        getItems();
    }, [getItems]);

    const output = loading ? (<h1>Loading...</h1>) : (items.map(item => <Item key={item._id} name={item.name} price={item.price} url={item.url} goalAchieved={item.goalAchieved} goalPercentage={item.goalPercentage} date={item.date} />))


    return (
        <div>

            <h1 className='display-4'>Dashboard</h1>
            <hr />
            <div className="items">
                {output}
            </div>

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

