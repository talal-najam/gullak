import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getItems } from '../../actions/item';
import { Link } from 'react-router-dom'
import Spinner from '../spinner/Spinner.js'
const TopItems = ({ item: { items, loading }, getItems }) => {

    useEffect(() => {
        getItems();
    }, [getItems])

    let output;

    if (items.length > 0 && !loading) {


        output = items.slice(0, 3).map((item, index) => {
            let progress = (item.savings / item.price) * 100;
            progress = progress.toFixed(2);

            return (<div key={index} className="top-item" style={{ width: "100%", padding: '1rem 0' }}>
                <div className="row">
                    <div className="col-5">
                        {index + 1}. {item.name}
                    </div>
                    <div className="col-5" style={{ width: '100%' }}>
                        <div className="progress">
                            <span style={{ width: '100%', position: 'absolute', textAlign: 'center', left: '0.4em' }}>{progress}%</span>
                            <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div className="col-2">
                        <Link to={`/myitems/${item._id}`} className="btn btn-primary btn-sm" style={{ position: 'absolute', right: '10px', padding: '0', marginTop: '-2px', width: '4rem' }}>Edit</Link>
                    </div>
                </div>
            </div >)
        });
    } else {
        output = loading ? <div className="no-item-container">
            <Spinner />
        </div> : (
                <div className="no-item-container">
                    <h3>You don't have any items &#9785;</h3>
                </div>
            )
    }


    return (
        <div>
            <div className="mt-2">
                <h3 className="text-center">Recent Items</h3>
                <hr />
                <div className="row">
                    <div className="col-12" style={{ padding: '1rem' }}>
                        {output}
                    </div>
                </div>
            </div>
        </div>
    )
}



TopItems.propTypes = {
    item: PropTypes.object.isRequired,
    getItems: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    item: state.item
})

export default connect(mapStateToProps, { getItems })(TopItems)
