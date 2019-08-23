import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteItem } from '../../actions/item';

const Item = ({ id, name, savings, price, url, goalAchieved, goalPercentage, date, deleteItem }) => {
    const boolHandle = goalAchieved == true ? (<span>Yes</span>) : (<span>No</span>)

    return (
        <div className="card" style={{ 'width': '95%' }}>
            <div className="card-body">
                <div className="d-flex mb-0">
                    <h5 className="card-title">{name}</h5>
                    <button onClick={() => deleteItem(id)} className="ml-auto text-danger">Delete</button>
                </div>
                <hr />
                <h6 className="card-subtitle mb-2 text-muted">Price: MYR <span className="font-weight-bold">{price}</span></h6>
                <h6 className="card-subtitle mb-2 text-muted">Savings: MYR <span className="font-weight-bold">{savings}</span></h6>
                <h6 className="card-subtitle mb-2">Goal Achieved?: {parseInt(savings) > parseInt(price) ? (<span>Yes</span>) : (<span>No</span>)}</h6>
                <hr />
                <div className="text-center">

                    {url && (<a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary card-link mr-3">Visit Page</a>)}
                    <Link to={`/myitems/${id}`} className="btn btn-primary ml-3">Modify Item</Link>
                </div>

            </div>
        </div>
    )
}

Item.propTypes = {
    deleteItem: PropTypes.func.isRequired,
}

export default connect(null, { deleteItem })(Item);
