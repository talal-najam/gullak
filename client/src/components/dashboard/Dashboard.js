import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Items from '../items/Items'
import { getItems } from '../../actions/item';

const Dashboard = ({ getItems, item: { items } }) => {

    const [myitems, setItems] = useState([]);

    useEffect(() => {
        console.log('Calling getItems()');
        getItems();
        setItems(items);
    }, []);

    console.log("My Items= " + myitems);

    // const output = myitems.map(item => <Item key={item._id} name={item.name} price={item.price} url={item.url} goalAchieved={item.goalAchieved} goalPercentage={item.goalPercentage} date={item.date} />);
    console.log('state ', myitems)

    return (
        <div>
            <h1>Dashboard</h1>
            <Items items={myitems} />
        </div>
    )
}

Dashboard.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    item: state.item
});

export default connect(mapStateToProps, { getItems })(
    Dashboard
);

