import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteItem } from '../../actions/item';
import Moment from 'react-moment';
import { getCurrencyFormat } from '../../utils/getCurrencyFormat';

const Item = ({ id, name, savings, price, url, goalAchieved, goalPercentage, date, deleteItem }) => {

    let progress = (savings / price) * 100;
    progress = progress.toFixed(2);

    return (
        <div className="card" style={{ 'width': '95%' }}>
            <div className="card-body">
                <div className="d-flex mb-0">
                    <h5 className="card-title pt-2">{name}</h5>
                    <button
                        onClick={() => {
                            if (window.confirm('This Item will be permanently deleted. This action is irreversable. Please confirm.')) deleteItem(id);
                        }
                        }
                        className="btn btn-outline-danger btn-sm ml-auto mb-1">Delete</button>
                </div>
                <hr />
                <h6 className="card-subtitle mb-2 text-muted">Price: RM <span className="font-weight-bold">{getCurrencyFormat(price)}</span></h6>
                <h6 className="card-subtitle mb-2 text-muted">Savings: RM <span className="font-weight-bold">{getCurrencyFormat(savings)}</span></h6>
                <h6 className="card-subtitle mb-2 text-muted">Goal Achieved?: {parseFloat(savings) > parseFloat(price) ? (<span>Yes</span>) : (<span>No</span>)}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Date Created: <Moment format="DD/MM/YY">{date}</Moment></h6>
                <hr />
                <div className="progress mb-3" style={{ height: '1.3rem' }}>
                    <h6 className="" style={{ width: '100%', position: 'absolute', textAlign: 'center', left: '0.4em' }}>Progress: {progress}%</h6>
                    <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
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
