import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { forgotPassword } from '../../actions/auth';

const ForgotPassword = ({ forgotPassword, history }) => {
    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;

    const onChange = e => {
        return setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async e => {
        e.preventDefault();
        forgotPassword(email, history);
    };

    return (
        <div className="row auth">
            <div className="col-lg-6 mx-auto auth-box">
                <div className="m-3 vh-center">
                    <p className='lead text-center'>
                        <i className='fas fa-user' /> Find Your Account
                        <hr />
                    </p>
                    <p className="text-muted">Please enter your email address to search for your account.</p>
                    <form className='form text-center' onSubmit={e => onSubmit(e)}>
                        <div className='form-group'>
                            <input
                                className="form-control"
                                type='email'
                                placeholder='Email Address'
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <input type='submit' className='mybuttons btn btn-primary' value='Submit'
                            style={{ backgroundColor: '#362b01', border: 'none', borderRadius: '0', width: '8rem' }}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

ForgotPassword.propTypes = {
    forgotPassword: PropTypes.func.isRequired,
}

export default connect(null, { forgotPassword })(ForgotPassword);