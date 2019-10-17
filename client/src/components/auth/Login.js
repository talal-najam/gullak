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
        loginUser(email, password, history);
    };

    return (
        <div className="row auth">
            <div className="col-lg-6 mx-auto auth-box">
                <div className="m-3 vh-center">
                    <h1 className='large text-center mb-3'>Login</h1>
                    <h3 className='lead text-center mb-3'>
                        <i className='fas fa-user' /> Sign In Now
            </h3>
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
                            style={{ border: 'none', borderRadius: '0', width: '8rem' }}
                        />
                    </form>
                    <div className="row">
                        <div className="col-6">
                            <p className="mt-3">
                                Don't have an account? <Link className="ml-1" to='/register'>Sign Up</Link>
                            </p>
                        </div>
                        <div className="col-6">
                            <p className="mt-3 text-right">
                                <Link to='/forgot_password' className="text-right">Forgot Password?</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
}

export default connect(null, { loginUser })(Login);