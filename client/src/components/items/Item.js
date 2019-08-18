import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ id, name, price, url, goalAchieved, goalPercentage, date, getItem }) => {
    const boolHandle = goalAchieved == true ? (<span>Yes</span>) : (<span>No</span>)

    return (
        <div className="card" style={{ 'width': '95%' }}>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Price: {price}</h6>
                <p className="card-text">Goal Arhieved: {boolHandle}</p>
                {url && (<a href="url" className="card-link">Visit Page</a>)}
                <Link to={`/myitems/${id}`} className="btn btn-primary">Modify</Link>
            </div>
        </div>
    )
}

export default Item;
