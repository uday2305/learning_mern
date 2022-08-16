import React, { useEffect } from "react";
import { connect } from "react-redux";
import { userActions } from "../../redux/actions";
import CheckOutForm from "./CheckOutForm";

const CheckOutLoggedIn = (props) => {
  useEffect(() => {
    // code to run on component mount
    props.getProfileDetails();
  }, []);

  return (
    <div>
      {props.userProfile ? (
        <CheckOutForm
          handleSubmit={props.handleSubmit}
          userProfile={props.userProfile}
        />
      ) : (
        ""
      )}
    </div>
  );
};

function mapState(state) {
  const { userProfile } = state.userProfileDetails;
  return { userProfile };
}

const actionCreators = {
  getProfileDetails: userActions.getUserProfile,
};

const connectedCheckOutForm = connect(
  mapState,
  actionCreators
)(CheckOutLoggedIn);
export { connectedCheckOutForm as CheckOutLoggedIn };
