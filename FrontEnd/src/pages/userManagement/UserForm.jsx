import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
function UserForm(props) {
  const [isAdmin, setIsAdmin] = useState(false);

  const { registering } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      if (values["password"] === values["confirmPassword"]) {
        let requestBody = { ...values };
        requestBody.isAdmin = isAdmin;
        props.handleSubmit(requestBody);
      } else {
        setErrors({
          confirmPassword: "Password and confirm password are not matching",
          password: "Password and confirm password are not matching",
        });
      }
    }
  };
  const handleChange = () => {
    setIsAdmin(!isAdmin);
  };
  const { values, errors, setErrors, bindField, isValid } = useForm({
    validations: props.validations || {},
    initialValues: props.initialValues || {},
  });
  return (
    <div className="mt-5 container">
      {alert.message && (
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      )}
      <form className="m-3" onSubmit={handleSubmit}>
        {props.initialValues.firstName ? (
          <h2 className="mb-3">Edit User</h2>
        ) : (
          <h2 className="mb-3">Add User</h2>
        )}
        <div className="mb-3">
          <div className="d-flex">
            <div className="me-3 w-50">
              <label htmlFor="register-first-name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                {...bindField("firstName")}
                name="firstName"
                id="firstName"
                aria-describedby="firstName"
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>
            <div className="w-50">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                {...bindField("lastName")}
                name="lastName"
                id="lastName"
                aria-describedby="lastName"
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...bindField("email")}
            name="email"
            id="email"
            aria-describedby="emailHelp"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        {props.validations?.password ? (
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...bindField("password")}
              name="password"
              id="password"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
        ) : (
          ""
        )}
        {props.validations?.password ? (
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              {...bindField("confirmPassword")}
              name="confirmPassword"
              id="confirmPassword"
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>
        ) : (
          ""
        )}
        <div className="mb-3">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckChecked"
              onChange={handleChange}
              checked={isAdmin}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckChecked"
            >
              is Admin
            </label>
          </div>
        </div>
        <button type="submit" id="register-submit" className="btn btn-primary">
          Submit
        </button>
        {registering && (
          <img
            alt="loading"
            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
          />
        )}
      </form>
    </div>
  );
}
export default UserForm;
