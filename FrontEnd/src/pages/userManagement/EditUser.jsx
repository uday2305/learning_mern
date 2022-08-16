import React, { useEffect } from "react";
import { adminUserActions, alertActions } from "../../actions";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import UserForm from "./UserForm";
import { editUserValidations } from "../../validations";
const EditUser = (props) => {
  const { alert, redirectTo } = props;
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };
  let pathName = usePathname();
  let userId = pathName.substring(
    "/admin/users/".length,
    pathName.indexOf("/edit")
  );

  useEffect(() => {
    props.clearAlerts();
    props.getUserDetails(userId);
  }, []);
  console.log(props.userDetails);
  const handleSubmit = (formValues) => {
    props.editUser(formValues, userId);
  };
  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  return (
    <div>
      {alert.message && (
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      )}
      {props.userDetails ? (
        <UserForm
          registering={props.loading}
          handleSubmit={handleSubmit}
          validations={editUserValidations}
          initialValues={{
            firstName: props.userDetails.firstName,
            lastName: props.userDetails.lastName,
            email: props.userDetails.email,
            isAdmin: false,
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

function mapState(state) {
  const { loading } = state.editUser;
  const { userDetails } = state.userDetails;
  const { alert } = state;
  const { redirectTo } = state.redirect;
  return { alert, loading, redirectTo, userDetails };
}

const actionCreators = {
  editUser: adminUserActions.editUser,
  getUserDetails: adminUserActions.getUserDetails,
  clearAlerts: alertActions.clear,
};

const connectedEditUser = connect(mapState, actionCreators)(EditUser);
export { connectedEditUser as EditUser };
