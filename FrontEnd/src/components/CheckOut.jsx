import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { userActions, alertActions } from "../actions";
import CheckOutForm from "./CheckOutForm";

function CheckOut(props) {
  const { redirectTo } = props;
  useEffect(() => {
    // code to run on component mount
    props.getProfileDetails();
  }, []);

  const handleSubmit = (formValues) => {
    console.log(formValues);
  };

  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }
  return (
    <div className="mt-5 container">
      <div className="p-2 mx-5">
        {props.alert.message && (
          <div className={`alert ${props.alert.type}`}>
            {props.alert.message}
          </div>
        )}
        {!props.user ? (
          <div>
            <h4>empty form</h4>
            <CheckOutForm handleSubmit={handleSubmit} userProfile={null} />
          </div>
        ) : props.userProfile ? (
          <CheckOutForm
            handleSubmit={handleSubmit}
            userProfile={props.userProfile}
          />
        ) : (
          ""
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
