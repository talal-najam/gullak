import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'

// 40 15:57

const Register = ({ setAlert, register, history }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => {
        return setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({ name, email, password }, history);
        }
    };

    return (
        <div className="row auth">
            <div className="col-lg-6 mx-auto auth-box">
                <div className="mt-3">
                    <h1 className='large text-center'>Sign Up</h1>
                    <h3 className='lead text-center'>
                        <i className='fas fa-user' /> Create Your Account And Join Us
                   </h3>
                    <form className='form text-center' onSubmit={e => onSubmit(e)}>
                        <div className='form-group'>
                            <input
                                className="form-control"
                                type='text'
                                placeholder='Name'
                                name='name'
                                value={name}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                className="form-control"
                                type='email'
                                placeholder='Email Address'
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                className="form-control"
                                type='password'
                                placeholder='Password'
                                name='password'
                                value={password}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                className="form-control"
                                type='password'
                                placeholder='Confirm Password'
                                name='password2'
                                value={password2}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>
                        <input type='submit' className='mybuttons btn btn-primary' value='Register'
                            style={{ border: 'none', borderRadius: '0', width: '8rem' }}
                        />
                    </form>
                    <p className="mt-3">
                        Already have an account? <Link to='/login'>Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
}

export default connect(null, { setAlert, register })(Register);