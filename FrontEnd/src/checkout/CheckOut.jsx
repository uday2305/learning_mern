import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { userActions, alertActions } from "../actions";
import CheckOutGuestForm from "./CheckOutGuestForm";
import { CheckOutLoggedIn } from "./CheckOutLoggedIn";

function CheckOut(props) {
  const { redirectTo } = props;

  const handleSubmit = (formValues) => {
    console.log(JSON.stringify(formValues));
  };

  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }
  return (
    <div className="mt-5 container">
      <div className="p-2 m-5">
        {props.alert.message && (
          <div className={`alert ${props.alert.type}`}>
            {props.alert.message}
          </div>
        )}
        {!props.user ? (
          <CheckOutGuestForm handleSubmit={handleSubmit} />
        ) : (
          <CheckOutLoggedIn handleSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
}

function mapState(state) {
  const { redirectTo } = state.redirect;
  const { userProfile } = state.userProfileDetails;
  let { user } = state.userAuthentication;
  const { alert } = state;
  return { alert, redirectTo, user, userProfile };
}

const actionCreators = {
  getProfileDetails: userActions.getUserProfile,
  clearAlerts: alertActions.clear,
};

const connectedCheckOut = connect(mapState, actionCreators)(CheckOut);
export { connectedCheckOut as CheckOut };
