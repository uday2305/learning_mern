import React from 'react';
import Welcome from '../../components/Welcome';
import { useForm } from '../../hooks/useForm';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions,alertActions } from '../../actions';

function Registration(props) {
  const { registering,alert,redirectTo } = props;
    const handleSubmit = e => {
        e.preventDefault();
        if(isValid()){
            if(values["password"] === values["confirmPassword"]){
              props.clearAlerts();
              props.register(values);
            }
            else{
                setErrors({
                    "confirmPassword": "Password and confirm password are not matching",
                    "password":"Password and confirm password are not matching"
                });
            }
        }
      };
    const { values, errors,setErrors, bindField, isValid } = useForm({
        validations: {
          firstName: {
            required: {
                value: true,
                message: 'First Name is required',
            },
          },
          lastName: {
            required: {
                value: true,
                message: 'Last Name is required',
            },
          },
          email:{
            required: {
                value: true,
                message: 'Email is required',
              }
          },
          password: {
            required: {
              value: true,
              message: 'password can\'t be empty',
            },
            custom: {
              validate: (value) => value.length >= 8,
              message: 'The password needs to be atleast 8 Chars',
            },
          },
          confirmPassword: {
            required: {
              value: true,
              message: 'confirm password can\'t be empty',
            },
            custom: {
              validate: (value) => value.length >= 8,
              message: 'The password needs to be atleast 8 chars',
            },
          },
        },
        initialValues:{
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirmPassword:''
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
                    <h2 className="mb-3">Register</h2>
                    <div className="mb-3">
                        <div  className="d-flex">
                            <div className='me-3 w-50'>
                                <label htmlFor="register-first-name" className="form-label">First Name</label>
                                <input type="text" className= {`form-control ${errors.firstName ? "is-invalid" : ""}`} {...bindField('firstName')} name="firstName" id="firstName" aria-describedby="firstName" />
                                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                            </div>
                            <div className='w-50'>
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input type="text" className= {`form-control ${errors.lastName ? "is-invalid" : ""}`} {...bindField('lastName')} name="lastName" id="lastName" aria-describedby="lastName" />
                                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className= {`form-control ${errors.email ? "is-invalid" : ""}`} {...bindField('email')} name="email" id="email" aria-describedby="emailHelp" />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className= {`form-control ${errors.password ? "is-invalid" : ""}`} {...bindField('password')} name="password"  id="password" />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className= {`form-control ${errors.confirmPassword ? "is-invalid" : ""}`} {...bindField('confirmPassword')} name="confirmPassword" id="confirmPassword" />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>
                    <button type="submit" id="register-submit" className="btn btn-primary">Submit</button>
                    {registering &&
                            <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                </form>
            </div>
        </div>)
};

function mapState(state) {
  const { registering } = state.userRegister;
  const {redirectTo} = state.redirect;
  const { alert } = state;
  return { registering,alert,redirectTo };
}

const actionCreators = {
  register: userActions.register,
  clearAlerts: alertActions.clear
};

const connectedRegisterPage = connect(mapState, actionCreators)(Registration);
export {connectedRegisterPage as Register};