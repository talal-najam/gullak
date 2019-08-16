import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItem } from '../../actions/item';

const Item = ({ id, name, price, url, goalAchieved, goalPercentage, date, getItem }) => {
    const boolHandle = goalAchieved == true ? (<span>Yes</span>) : (<span>No</span>)

    return (
        <div className="card" style={{ 'width': '95%' }}>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Price: {price}</h6>
                <p className="card-text">Goal Arhieved: {boolHandle}</p>
                {url && (<a href="#" className="card-link">Visit Page</a>)}
                <button onClick={() => getItem()} className="btn btn-primary">Modify</button>
            </div>
        </div>
    )
}

export default connect(null, { getItem })(Item)
