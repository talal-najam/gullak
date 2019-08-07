import React from 'react'

const Item = ({ id, name, price, url, goalAchieved, goalPercentage, date }) => {
    const boolHandle = goalAchieved == true ? (<span>Yes</span>) : (<span>No</span>)

    return (
        <div className="card" style={{ 'width': '95%' }}>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Price: {price}</h6>
                <p className="card-text">Goal Arhieved: {boolHandle}</p>
                {url && (<a href="#" className="card-link">Visit Page</a>)}
            </div>
        </div>
    )
}

export default Item
