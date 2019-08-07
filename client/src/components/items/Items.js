import React from 'react'
import Item from './Item';

const Items = ({ items }) => {

    const itemCards = items.map(item => <Item key={item._id} name={item.name} price={item.price} url={item.url} goalAchieved={item.goalAchieved} goalPercentage={item.goalPercentage} date={item.date} />
    )

    return (
        <div className="items">
            {itemCards}
        </div>
    )
}



export default Items;
