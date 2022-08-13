import React from 'react';
import Welcome from '../components/Welcome';
import { useForm } from '../hooks/useForm';
import { Link,Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions,alertActions } from '../actions';

function Login(props) {

    const { loggingIn,alert,redirectTo } = props;
    const handleSubmit = e => {
        e.preventDefault();
        if (isValid()) {
            props.clearAlerts();
            props.login(values.email, values.password);
        }
    };

    const { values, errors, bindField, isValid } = useForm({
        validations: {
            email: {
                required: {
                    value: true,
                    message: 'Email is required',
                }
            },
            password: {
                required: {
                    value: true,
                    message: 'password can\'t be empty',
                }
            },
        },
        initialValues: {
            email: '',
            password: '',
        },
    });
    if (redirectTo) {
        return <Navigate to={redirectTo} />;
      }
    return (
        <div className="mt-5 d-flex container">
            <Welcome />
            <div className='p-2 mx-5 w-50 border border-dark rounded'>
            {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                <form className='m-3' onSubmit={handleSubmit}>
                    <h2 className="mb-3">Login</h2>
                    <div className="mb-3">
                        <label htmlFor="login-email" className="form-label">Email address</label>
                        <input type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} {...bindField('email')} name="email" id="login-email" aria-describedby="emailHelp" />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="login-password" className="form-label">Password</label>
                        <input type="password" className={`form-control ${errors.password ? "is-invalid" : ""}`} {...bindField('password')} name="password" id="login-password" />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="align-self-end">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        {loggingIn &&
                            <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>
        </div>)
};

function mapState(state) {
    const { loggingIn } = state.userAuthentication;
    const {redirectTo} = state.redirect;
    const { alert } = state;
    return { loggingIn,alert,redirectTo };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout,
    clearAlerts: alertActions.clear
};

const connectedLoginPage = connect(mapState, actionCreators)(Login);
export {connectedLoginPage as Login};
