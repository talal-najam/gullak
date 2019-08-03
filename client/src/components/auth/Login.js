import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { loginUser } from '../../actions/auth';

const Login = ({ loginUser, history }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: ''
    });

    const { email, password, password2 } = formData;

    const onChange = e => {
        return setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async e => {
        e.preventDefault();
        console.log(formData);
        loginUser(email, password, history);
    };

    return (
        <div className="row">
            <div className="col-lg-6 mx-auto">
                <div className="mt-3">
                    <h1 className='large text-center'>Login</h1>
                    <p className='lead text-center'>
                        <i className='fas fa-user' /> Sign In Now
            </p>
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
                        <div className='form-group'>
                            <input
                                className="form-control"
                                type='password'
                                placeholder='Password'
                                name='password'
                                value={password}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <input type='submit' className='mybuttons btn btn-primary' value='Login'
                            style={{ backgroundColor: '#362b01', border: 'none', borderRadius: '0', width: '8rem' }}
                        />
                    </form>
                    <p className="mt-3">
                        Don't have an account? <Link to='/register'>Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
}

export default connect(null, { loginUser })(Login);