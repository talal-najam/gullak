import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { verifyToken, resetPassword } from '../../actions/auth';

const ResetPassword = ({ verifyToken, resetPassword, auth: { user, loading }, match, history }) => {
    const [formData, setFormData] = useState({
        password: '',
        password2: '',
    });
    const { token } = match.params;

    useEffect(() => {
        verifyToken(token, history);
    }, [verifyToken]);

    const { password, password2 } = formData;

    const onChange = e => {
        return setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async e => {
        e.preventDefault();
        resetPassword(token, password, history);
    };

    const valid_output = (
        <div className="row auth">
            <div className="col-lg-6 mx-auto auth-box">
                <div className="m-3 vh-center">
                    <p className='lead text-center'>
                        <i className='fas fa-user' /> Reset Your Password
            </p>
                    <form className='form text-center' onSubmit={e => onSubmit(e)}>
                        <div className='form-group'>
                            <input
                                className="form-control"
                                type='password'
                                placeholder='Enter new password'
                                name='password'
                                value={password}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                className="form-control"
                                type='password'
                                placeholder='Confirm the password'
                                name='password2'
                                value={password2}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <input type='submit' className='mybuttons btn btn-primary' value='Reset'
                            style={{ backgroundColor: '#362b01', border: 'none', borderRadius: '0', width: '8rem' }}
                        />
                    </form>
                </div>
            </div>
        </div>
    )

    let output = '';

    if (loading) {
        output = 'Verifying token...';
    } else if (user) {
        if (user.isResetPasswordTokenValidated) {
            output = valid_output;
        } else {
            output = 'Sorry bruh your token is invalid :('
        }
    }




    return (
        <div className="c">
            {output}
        </div>
    )
}

ResetPassword.propTypes = {
    verifyToken: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { verifyToken, resetPassword })(ResetPassword);
