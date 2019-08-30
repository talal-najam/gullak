import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getItems } from '../../actions/item';
import { Link } from 'react-router-dom'
const TopItems = ({ item: { items, loading }, getItems }) => {

    useEffect(() => {
        getItems();
    }, [getItems])

    let output;

    if (items.length > 0 && !loading) {
        output = items.slice(0, 3).map((item, index) => (
            <div key={index} className="top-item" style={{ width: "100%", padding: '1rem' }}>
                {index + 1}. {item.name}
                <Link to={`/myitems/${item._id}`} className="btn btn-primary btn-sm" style={{ position: 'absolute', right: '2rem' }}>View Item</Link>
            </div>
        ));
    } else {
        output = (<h3>You don't have any items</h3>)
    }


    return (
        <div>
            <div className="mt-2">
                <h3 className="text-center">Recent Items</h3>
                <hr />
                <div className="row">
                    <div className="col-12">
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
