import React, { useEffect } from "react";
import { userActions } from "../actions";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Logout = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
    // code to run on component mount
    props.logout();
    navigate("/");
  }, []);
  return (
    <div className="container">
      <div className="my-5 d-flex">
        <h1> Logging Out.....</h1>
      </div>
    </div>
  );
};

function mapState(state) {
  return {};
}

const actionCreators = {
  logout: userActions.logout,
};

const connectedLogout = connect(mapState, actionCreators)(Logout);
export { connectedLogout as Logout };
