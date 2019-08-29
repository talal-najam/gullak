import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { createItem } from '../../actions/item';

const CreateItem = ({ createItem, history }) => {

    const [formData, setFormData] = useState({
        "name": "",
        "price": 0,
        "url": "",
        "savings": "",
    })

    const { name, price, url, savings } = formData;

    const onChange = e => {
        return setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        console.log('Create An Item pressed', name, price, url, savings);


        createItem(name, price, url, savings, history);
    }


    return (
        <div className="row">
            <div className="col-lg-6 mx-auto item-background ">
                <div className="mt-3">
                    <h1 className='large text-center'>Create an Item</h1>
                    <hr />

                    <form className='form text-center' onSubmit={e => onSubmit(e)}>
                        <div className='form-group'>
                            <input
                                className="form-control"
                                type='text'
                                placeholder='Name of the Item'
                                name='name'
                                value={name}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                className="form-control"
                                type='number'
                                placeholder='Price of the Item'
                                name='price'
                                value={price}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                className="form-control"
                                type='text'
                                placeholder='Url of the Item'
                                name='url'
                                value={url}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                className="form-control"
                                type='number'
                                placeholder='Optional: Your current savings you have for the Item'
                                name='savings'
                                value={savings}
                                onChange={e => onChange(e)}
                            />
                        </div>

                        <input type='submit' className='mybuttons btn btn-primary' value='Create'
                            style={{ backgroundColor: '#362b01', border: 'none', borderRadius: '0', width: '8rem' }}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

CreateItem.propTypes = {
    createItem: PropTypes.func.isRequired,
}

export default connect(null, { createItem })(CreateItem);
