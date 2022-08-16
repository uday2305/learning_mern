import React, { useEffect } from "react";
import { adminUserActions, alertActions } from "../../actions";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import UserForm from "./UserForm";
import { addUserValidations } from "../../validations";
const AddUser = (props) => {
  const { alert, redirectTo } = props;
  let initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  useEffect(() => {
    props.clearAlerts();
  }, []);

  const handleSubmit = (formValues) => {
    props.addUser(formValues);
  };
  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  return (
    <div>
      {alert.message && (
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      )}
      <UserForm
        registering={props.loading}
        handleSubmit={handleSubmit}
        validations={addUserValidations}
        initialValues={initialValues}
      />
    </div>
  );
};

function mapState(state) {
  const { loading } = state.addUser;
  const { alert } = state;
  const { redirectTo } = state.redirect;
  return { alert, loading, redirectTo };
}

const actionCreators = {
  addUser: adminUserActions.addUser,
  clearAlerts: alertActions.clear,
};

const connectedAddUser = connect(mapState, actionCreators)(AddUser);
export { connectedAddUser as AddUser };
